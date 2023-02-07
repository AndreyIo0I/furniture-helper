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
        IReadOnlyList<Project> projects = await _projectRepository.GetActiveByPeriod(period.StartDate, period.EndDate);
        IReadOnlyList<ProjectBudget> projectBudgets = await _projectBudgetRepository.GetByProjectIds( projects.Select( x => x.Id ).ToList() );

        return new NumericalIndicatorsDto
        {
            AverageCheck = _analyticsService.CalculateAverageCheck( projectBudgets.Select( x => x.ProjectCost ).ToList() ),
            AverageProductionDays = _analyticsService.CalculateAverageProductionDays(
                projects.Select( x => new Period( x.DateOfStart.Value, x.EndDate.Value ) )
                    .ToList() ),
            NumberOfProducts = projects.Count
        };
    }
}