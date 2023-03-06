using ExtranetAPI.Analytics.Models.Chart;
using ExtranetAPI.Analytics.Services.ChartAnalytics;
using ExtranetAPI.Models;

namespace ExtranetAPI.Analytics.Services.Builders;

public class ChartAnalyticsBuilder: IChartAnalyticsBuilder
{
    private readonly IChartAnyticsService _chartAnyticsService;
    private readonly IProjectDataCollectorFactory _projectDataCollectorFactory;
    
    public ChartAnalyticsBuilder(
        IChartAnyticsService chartAnyticsService,
        IProjectDataCollectorFactory projectDataCollectorFactory)
    {
        _chartAnyticsService = chartAnyticsService;
        _projectDataCollectorFactory = projectDataCollectorFactory;
    }

    public async Task<List<ChartItemDto>> Build( ChartType chartType, ChartPeriodType chartPeriodType, Period period )
    {
        IProjectsDataCollector projectsDataCollector = _projectDataCollectorFactory.GetProjectDataCollector(chartType);

        return ( await _chartAnyticsService.CreateChartAnalyticsByDate(projectsDataCollector, chartPeriodType, period) )
            .OrderBy( x => x.Date ).ToList();
    }
    
    public async Task<List<ChartItemWeeksDto>> BuildByPeriod( ChartType chartType, ChartPeriodType chartPeriodType, Period period )
    {
        IProjectsDataCollector projectsDataCollector = _projectDataCollectorFactory.GetProjectDataCollector(chartType);

        return ( await _chartAnyticsService.CreateChartAnalyticsByPeriod(projectsDataCollector, chartPeriodType, period) )
            .OrderBy( x => x.Period.StartDate ).ToList();
    }
}