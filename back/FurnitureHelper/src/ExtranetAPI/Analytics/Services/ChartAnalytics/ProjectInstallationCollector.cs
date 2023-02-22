using ExtranetAPI.Models;

namespace ExtranetAPI.Analytics.Services.ChartAnalytics;

public class ProjectInstallationCollector: IProjectsDataCollector
{
    private readonly IProjectStageCalculator _projectStageCalculator;

    public ProjectInstallationCollector(IProjectStageCalculator projectStageCalculator)
    {
        _projectStageCalculator = projectStageCalculator;
    }

    public async Task<decimal> GetValueForProjects( List<int> projectsIds, Period? period = null )
    {
        return await _projectStageCalculator.CalculateStage(projectsIds, "Installation");
    }
}