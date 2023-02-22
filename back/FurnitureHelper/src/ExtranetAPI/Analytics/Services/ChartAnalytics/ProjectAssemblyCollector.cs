using ExtranetAPI.Models;

namespace ExtranetAPI.Analytics.Services.ChartAnalytics;

public class ProjectAssemblyCollector: IProjectsDataCollector
{
    private readonly IProjectStageCalculator _projectStageCalculator;

    public ProjectAssemblyCollector(IProjectStageCalculator projectStageCalculator)
    {
        _projectStageCalculator = projectStageCalculator;
    }

    public async Task<decimal> GetValueForProjects( List<int> projectsIds, Period? period = null )
    {
        return await _projectStageCalculator.CalculateStage(projectsIds, "Assembling");
    }
}