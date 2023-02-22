namespace ExtranetAPI.Analytics.Services.ChartAnalytics;

public class ProjectCalculationCollector: IProjectsDataCollector
{
    private readonly IProjectStageCalculator _projectStageCalculator;

    public ProjectCalculationCollector(IProjectStageCalculator projectStageCalculator)
    {
        _projectStageCalculator = projectStageCalculator;
    }

    public async Task<decimal> GetValueForProjects( List<int> projectsIds )
    {
        return await _projectStageCalculator.CalculateStage(projectsIds, "Calculation");
    }
}