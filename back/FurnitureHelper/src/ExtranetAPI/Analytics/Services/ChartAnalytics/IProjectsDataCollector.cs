namespace ExtranetAPI.Analytics.Services.ChartAnalytics;

public interface IProjectsDataCollector
{
    Task<decimal> GetValueForProjects(List<int> projectsIds);
}