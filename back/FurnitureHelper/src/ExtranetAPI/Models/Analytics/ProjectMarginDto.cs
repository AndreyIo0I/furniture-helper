namespace ExtranetAPI.Models.Analytics;

public class ProjectMarginDto
{
    public DateTime ProjectStartdate { get; set; }
    public DateTime ProjectDeadLine { get; set; }
    public string ProjectName { get; set; }
    public decimal ProjectMargin { get; set; }
}