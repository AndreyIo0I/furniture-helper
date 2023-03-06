using Domain.ProjectManagement;
using ExtranetAPI.Analytics.Models;
using ExtranetAPI.Models;

namespace ExtranetAPI.Analytics.Services.Builders;

public class ProjectNumericalIndicatorsBuilder : IProjectNumericalIndicatorsBuilder
{
    private readonly IProjectRepository _projectRepository;
    private readonly IProjectBudgetRepository _projectBudgetRepository;
    private readonly IAnalyticsService _analyticsService;
    
    public ProjectNumericalIndicatorsBuilder(
        IProjectBudgetRepository projectBudgetRepository,
        IProjectRepository projectRepository,
        IAnalyticsService analyticsService )
    {
        _projectBudgetRepository = projectBudgetRepository;
        _projectRepository = projectRepository;
        _analyticsService = analyticsService;
    }

    public async Task<NumericalIndicatorsDto> Build( Period period )
    {
        NumericalIndicatorsDto numericalIndicatorsDto = new();

        IReadOnlyList<Project> projects = await _projectRepository.GetByPeriod(period.StartDate, period.EndDate);
        if ( projects.Count == 0 )
        {
            return numericalIndicatorsDto;
        }

        IReadOnlyList<ProjectBudget> projectBudgets = await _projectBudgetRepository.GetByProjectIds( projects.Select( x => x.Id ).ToList() );

        numericalIndicatorsDto.AverageCheck = _analyticsService.CalculateAverageCheck( projectBudgets.Select( x => x.ProjectCost ).ToList() );
        numericalIndicatorsDto.AverageProductionDays = _analyticsService.CalculateAverageProductionDays(
                projects.Select( x => new Period( x.DateOfStart.Value, x.EndDate.Value ) )
                    .ToList() );
        numericalIndicatorsDto.NumberOfProducts = projects.Count;

        return numericalIndicatorsDto;
    }
}