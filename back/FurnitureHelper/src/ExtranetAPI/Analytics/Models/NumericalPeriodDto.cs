using ExtranetAPI.Analytics.Models.Chart;
using ExtranetAPI.Models;

namespace ExtranetAPI.Analytics.Models;

public class NumericalPeriodDto
{
    public Period Period { get; set; }
    public ChartPeriodType ChartPeriodType { get; set; }

}