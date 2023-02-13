using ExtranetAPI.Models;

namespace ExtranetAPI.Analytics.Models.Chart;

public class ChartPeriodDto
{
    public Period Period { get; set; }
    public ChartPeriodType ChartPeriodType { get; set; }
}