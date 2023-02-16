using ExtranetAPI.Analytics.Models.Chart;

namespace ExtranetAPI.Analytics.Services.ChartAnalytics;

public interface IProjectDataCollectorFactory
{
    IProjectsDataCollector GetProjectDataCollector( ChartType chartType );
}