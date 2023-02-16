﻿using Domain.ProjectManagement;

namespace ExtranetAPI.Analytics.Services.ChartAnalytics;

public class ProjectsKTwoCollector: IProjectsDataCollector
{
    private readonly IProjectBudgetRepository _projectBudgetRepository;
    private readonly IAnalyticsService _analyticsService;

    public ProjectsKTwoCollector(
        IProjectBudgetRepository projectBudgetRepository,
        IAnalyticsService analyticsService)
    {
        _projectBudgetRepository = projectBudgetRepository;
        _analyticsService = analyticsService;
    }
    
    public async Task<decimal> GetValueForProjects(List<int> projectsIds)
    {
        IReadOnlyList<ProjectBudget> projectBudgets = await _projectBudgetRepository.GetByProjectIds(projectsIds);
        
        decimal totalKOne = Decimal.Zero;

        foreach (var projectBudget in projectBudgets)
        {
            totalKOne += _analyticsService.CalculateProjectRateOfSurplusValue(
                projectBudget.CostPayments.Select(x => x.Amount).Sum(),
                projectBudget.ProjectCost );
        }

        return totalKOne;
    }
}