using Domain.CostsManagement;
using Domain.ProjectManagement;
using ExtranetAPI.Models;

namespace ExtranetAPI.Analytics.Services.ChartAnalytics;

public class ProjectProfitCollector: IProjectsDataCollector
{
    private readonly IProjectBudgetRepository _projectBudgetRepository;
    private readonly IBuisnessCostRepository _buisnessCostRepository;

    public ProjectProfitCollector(
        IProjectBudgetRepository projectBudgetRepository,
        IBuisnessCostRepository buisnessCostRepository)
    {
        _projectBudgetRepository = projectBudgetRepository;
        _buisnessCostRepository = buisnessCostRepository;
    }

    public async Task<decimal> GetValueForProjects(List<int> projectsIds, Period? period)
    {
        if (period == null)
        {
            throw new NullReferenceException("Period can't be null");
        }
        
        IReadOnlyList<ProjectBudget> projectBudgets = await _projectBudgetRepository.GetByProjectIds(projectsIds);

        decimal revenue = projectBudgets.Select(x => x.ProjectCost).Sum();
        
        List<CostPayment> costPayments = projectBudgets.SelectMany(x => x.CostPayments).ToList();

        decimal costs = costPayments.Select(x => x.Amount).Sum();

        IReadOnlyList<BuisnessCost> buisnessCosts = await _buisnessCostRepository.GetAll(
            DateTime.SpecifyKind(period.StartDate, DateTimeKind.Utc),
            DateTime.SpecifyKind(period.EndDate, DateTimeKind.Utc));

        decimal buisnessCostsAmount = buisnessCosts.Select(x => x.Amount).Sum();

        return revenue - costs - buisnessCostsAmount;
    }
}