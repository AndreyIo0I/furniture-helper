namespace ExtranetAPI.Models.Analytics;

public class OutdatedProjectDto
{
    public DateTime StartDate { get; set; }
    public DateTime DeadLine { get; set; }
    public string ProjectName { get; set; }
    public int WastedDays { get; set; }
}