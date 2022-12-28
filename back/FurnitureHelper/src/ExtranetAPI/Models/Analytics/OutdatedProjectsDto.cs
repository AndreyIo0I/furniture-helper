namespace ExtranetAPI.Models.Analytics;

public class OutdatedProjectsDto
{
    public List<OutdatedProjectDto> OutdatedProjects { get; set; }
    public Period Period { get; set; }
    public decimal AverageAmount { get; set; }
}