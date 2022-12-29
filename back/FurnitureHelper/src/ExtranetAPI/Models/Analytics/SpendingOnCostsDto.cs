using ExtranetAPI.Models.Analytics;

namespace ExtranetAPI.Models;

public class SpendingOnCostsDto
{
    public List<SpendingOnCostDto> SpendingOnCosts { get; set; }
    public Period Period { get; set; }
}