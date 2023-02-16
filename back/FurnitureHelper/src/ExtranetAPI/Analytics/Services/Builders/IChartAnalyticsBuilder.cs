using ExtranetAPI.Analytics.Models.Chart;
using ExtranetAPI.Models;

namespace ExtranetAPI.Analytics.Services.Builders;

public interface IChartAnalyticsBuilder
{
    Task<List<ChartItemDto>> Build(ChartType chartType, ChartPeriodType chartPeriodType, Period period);
    Task<List<ChartItemWeeksDto>> BuildByPeriod(ChartType chartType, ChartPeriodType chartPeriodType, Period period);
}