namespace ExtranetAPI.Models
{
    public class ProjectDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ContractNumber { get; set; }
        public DateTime DateOfStart { get; set; }
        public DateTime DeadLine { get; set; }
        public int ClientId { get; set; }
        public string Description { get; set; }
    }
}
