using ExtranetAPI.Analytics.Models.ProjectSummary;

namespace ExtranetAPI.Models.ProjectSummary;

public class CostPriceDto
{
    public decimal CostPrice { get; set; }
    public List<CostDto> Costs { get; set; }
}