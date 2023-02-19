namespace ExtranetAPI.Analytics.Services.ChartAnalytics;

public class ProjectContractCollector: IProjectsDataCollector
{
    private readonly IProjectStageCalculator _projectStageCalculator;

    public ProjectContractCollector(IProjectStageCalculator projectStageCalculator)
    {
        _projectStageCalculator = projectStageCalculator;
    }

    public async Task<decimal> GetValueForProjects( List<int> projectsIds )
    {
        return await _projectStageCalculator.CalculateStage(projectsIds, "Contract");
    }
}