using Domain.ProjectManagement;
using ExtranetAPI.Models;

namespace ExtranetAPI.Analytics.Services.ChartAnalytics;

public class ProjectsKOneCollector: IProjectsDataCollector
{
    private readonly IProjectBudgetRepository _projectBudgetRepository;
    private readonly IAnalyticsService _analyticsService;

    public ProjectsKOneCollector(
        IProjectBudgetRepository projectBudgetRepository,
        IAnalyticsService analyticsService)
    {
        _projectBudgetRepository = projectBudgetRepository;
        _analyticsService = analyticsService;
    }
    
    public async Task<decimal> GetValueForProjects(List<int> projectsIds, Period? period = null)
    {
        IReadOnlyList<ProjectBudget> projectBudgets = await _projectBudgetRepository.GetByProjectIds(projectsIds);
        
        decimal totalKOne = Decimal.Zero;

        foreach (var projectBudget in projectBudgets)
        {
            totalKOne += _analyticsService.CalculateProjectProfitNorm(
                projectBudget.CostPayments.Select(x => x.Amount).Sum(),
                projectBudget.ProjectCost );
        }

        return totalKOne;
    }
}