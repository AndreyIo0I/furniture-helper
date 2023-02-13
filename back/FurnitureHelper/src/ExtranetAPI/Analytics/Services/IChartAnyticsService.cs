using ExtranetAPI.Analytics.Models.Chart;
using ExtranetAPI.Analytics.Services.ChartAnalytics;
using ExtranetAPI.Models;

namespace ExtranetAPI.Analytics.Services;

public interface IChartAnyticsService
{
    Task<List<ChartItemDto>> CreateChartAnalyticsByDate(
        IProjectsDataCollector projectsDataCollector,
        ChartPeriodType chartPeriodType,
        Period period);
    Task<List<ChartItemWeeksDto>> CreateChartAnalyticsByPeriod(
        IProjectsDataCollector projectsDataCollector,
        ChartPeriodType chartPeriodType,
        Period period);
}