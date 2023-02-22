namespace ExtranetAPI.Analytics.Services.ChartAnalytics;

public class ProjectPaymentCollector: IProjectsDataCollector
{
    private readonly IProjectStageCalculator _projectStageCalculator;

    public ProjectPaymentCollector(IProjectStageCalculator projectStageCalculator)
    {
        _projectStageCalculator = projectStageCalculator;
    }

    public async Task<decimal> GetValueForProjects( List<int> projectsIds )
    {
        return await _projectStageCalculator.CalculateStage(projectsIds, "Payment");
    }
}