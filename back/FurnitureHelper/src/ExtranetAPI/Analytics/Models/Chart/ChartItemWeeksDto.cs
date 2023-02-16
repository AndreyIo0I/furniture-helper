using ExtranetAPI.Models;

namespace ExtranetAPI.Analytics.Models.Chart;

public class ChartItemWeeksDto
{
    public Period Period { get; set; }
    public decimal Value { get; set; }
}