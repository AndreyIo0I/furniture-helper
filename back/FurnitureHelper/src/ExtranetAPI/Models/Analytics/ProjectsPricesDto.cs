namespace ExtranetAPI.Models.Analytics;

public class ProjectsPricesDto
{
    public decimal AveragePrice { get; set; }
    public List<ProjectPriceDto> ProjectPrices { get; set; }
    public ProjectPriceDto MaxProjectPrice { get; set; }
    public ProjectPriceDto MinProjectPrice { get; set; }
}