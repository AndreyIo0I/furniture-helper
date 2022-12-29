using ExtranetAPI.Models.Analytics;

namespace ExtranetAPI.Models;

public class SpendingOnProjectCostsDto
{
    public List<SpendingOnCostDto> SpendingOnCosts { get; set; }
    public string ProjectName { get; set; }
}