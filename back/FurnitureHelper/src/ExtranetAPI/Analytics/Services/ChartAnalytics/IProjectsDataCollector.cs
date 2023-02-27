using ExtranetAPI.Models;

namespace ExtranetAPI.Analytics.Services.ChartAnalytics;

public interface IProjectsDataCollector
{
    Task<decimal> GetValueForProjects(List<int> projectsIds, Period? period );
}