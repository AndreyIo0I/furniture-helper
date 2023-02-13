using ExtranetAPI.Models;

namespace ExtranetAPI.Analytics.Models.Chart;

public class ChartDto
{
    public Period Period { get; set; }
    public ChartPeriodType ChartPeriodType { get; set; }
    public List<ChartItemDto> ChartItems { get; set; }
}