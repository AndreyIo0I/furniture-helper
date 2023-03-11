using Domain.ProjectManagement;
using ExtranetAPI.Analytics.Extensions;
using ExtranetAPI.Analytics.Models;
using ExtranetAPI.Analytics.Models.Chart;
using ExtranetAPI.Models;

namespace ExtranetAPI.Analytics.Services.Builders;

public class ProjectNumericalIndicatorsBuilder : IProjectNumericalIndicatorsBuilder
{
    private readonly IProjectsPayService _projectsPayService;
    private readonly IProjectBudgetRepository _projectBudgetRepository;
    private readonly IAnalyticsService _analyticsService;
    
    public ProjectNumericalIndicatorsBuilder(
        IProjectBudgetRepository projectBudgetRepository,
        IAnalyticsService analyticsService, 
        IProjectsPayService projectsPayService)
    {
        _projectBudgetRepository = projectBudgetRepository;
        _analyticsService = analyticsService;
        _projectsPayService = projectsPayService;
    }

    public async Task<NumericalIndicatorsDto> Build( NumericalPeriodDto numericalPeriod )
    {
        Period period = numericalPeriod.Period;
        
        switch (numericalPeriod.ChartPeriodType)
        {
            case ChartPeriodType.ByDays:
                if (period.StartDate.Day == period.EndDate.Day)
                {
                    DateTime date = period.StartDate;
                    period.StartDate = new DateTime(date.Year, date.Month, date.Day, 0, 0, 0);
                    period.EndDate = new DateTime(date.Year, date.Month, date.Day, 0, 0, 0).AddHours(23).AddMinutes(59);
                }
                break;
            case ChartPeriodType.ByMonths:
                DateTime startDate = period.StartDate;
                DateTime endDate = period.EndDate;
                period.StartDate = new DateTime(startDate.Year, startDate.Month, 1);
                period.EndDate = new DateTime(endDate.Year, endDate.Month + 1, 1).AddDays(-1);
                break;
            case ChartPeriodType.ByYears:
                int startDateYear = period.StartDate.Year;
                int endDateYear = period.EndDate.Year;
                period.StartDate = new DateTime(startDateYear, 1, 1);
                period.EndDate = new DateTime(endDateYear, 12, 31);
                break;
            case ChartPeriodType.ByWeeks:
                period.StartDate = period.StartDate.Week().StartDate;
                period.EndDate = period.EndDate.Week().EndDate;
                break;
            default:
                throw new ArgumentOutOfRangeException( "Invalid chart period type" );
        }
        
        NumericalIndicatorsDto numericalIndicatorsDto = new();

        IReadOnlyList<Project> projects = ( await _projectsPayService
            .GetProjectWithPayByPeriod(
                period.StartDate, 
                period.EndDate) ).Select( x => x.Item1 ).ToList();
        if ( projects.Count == 0 )
        {
            return numericalIndicatorsDto;
        }

        IReadOnlyList<ProjectBudget> projectBudgets = await _projectBudgetRepository.GetByProjectIds( projects.Select( x => x.Id ).ToList() );

        numericalIndicatorsDto.AverageCheck = _analyticsService.CalculateAverageCheck( projectBudgets.Select( x => x.ProjectCost ).ToList() );
        numericalIndicatorsDto.AverageProductionDays = _analyticsService.CalculateAverageProductionDays(
                projects.Where(x => x.DateOfStart.HasValue && x.EndDate.HasValue)
                    .Select( x => new Period( x.DateOfStart.Value, x.EndDate.Value ) )
                    .ToList() );
        numericalIndicatorsDto.NumberOfProducts = projects.Count;

        return numericalIndicatorsDto;
    }
}