namespace ExtranetAPI.Models.Analytics;

public class ProjectsMagrinDto
{
    public List<ProjectMarginDto> ProjectMargins { get; set; }
    public Period Period { get; set; }
    public decimal TotalMargin { get; set; }
}