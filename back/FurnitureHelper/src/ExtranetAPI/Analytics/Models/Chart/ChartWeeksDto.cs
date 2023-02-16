using ExtranetAPI.Models;

namespace ExtranetAPI.Analytics.Models.Chart;

public class ChartWeeksDto
{
    public Period Period { get; set; }
    public ChartPeriodType ChartPeriodType { get; set; }
    public ChartType ChartType { get; set; }
    public List<ChartItemWeeksDto> ChartItemWeeks { get; set; }
}