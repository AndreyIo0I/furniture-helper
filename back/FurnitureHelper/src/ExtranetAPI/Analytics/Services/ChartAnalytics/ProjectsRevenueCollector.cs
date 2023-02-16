using Domain.ProjectManagement;

namespace ExtranetAPI.Analytics.Services.ChartAnalytics;

public class ProjectsRevenueCollector: IProjectsDataCollector
{
    private readonly IProjectBudgetRepository _projectBudgetRepository;

    public ProjectsRevenueCollector(IProjectBudgetRepository projectBudgetRepository)
    {
        _projectBudgetRepository = projectBudgetRepository;
    }

    public async Task<decimal> GetValueForProjects(List<int> projectsIds)
    {
        IReadOnlyList<ProjectBudget> projectBudgets = await _projectBudgetRepository.GetByProjectIds(projectsIds);

        return projectBudgets.Select(x => x.ProjectCost).Sum();
    }
}