using Domain.ProjectManagement;

namespace ExtranetAPI.Analytics.Services.ChartAnalytics;

public class ProjectsCostsCollector: IProjectsDataCollector
{
    private readonly IProjectBudgetRepository _projectBudgetRepository;

    public ProjectsCostsCollector(IProjectBudgetRepository projectBudgetRepository)
    {
        _projectBudgetRepository = projectBudgetRepository;
    }

    public async Task<decimal> GetValueForProjects(List<int> projectsIds)
    {
        IReadOnlyList<ProjectBudget> projectBudgets = await _projectBudgetRepository.GetByProjectIds(projectsIds);
        List<CostPayment> costPayments = projectBudgets.SelectMany(x => x.CostPayments).ToList();

        return costPayments.Select(x => x.Amount).Sum();

    }
}