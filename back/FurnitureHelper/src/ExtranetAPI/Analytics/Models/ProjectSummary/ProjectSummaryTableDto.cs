using ExtranetAPI.Models.ProjectSummary;

namespace ExtranetAPI.Analytics.Models.ProjectSummary;

public class ProjectSummaryTableDto
{
    public string ContractNumber { get; set; }
    public string ProjectType { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public int NumberOfDays { get; set; }
    public decimal ProjectCost { get; set; }
    public CostPriceDto CostPrice { get; set; }
    public decimal Margin { get; set; }
    public decimal ProfitNorm { get; set; }
    public decimal RateOfSurplusValue { get; set; }
    public List<StageDto> Stages { get; set; }
}