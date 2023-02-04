namespace ExtranetAPI.Models
{
    public class ProjectDto
    {
        public int Id { get; set; }
        public string ProjectType { get; set; }
        public string ContractNumber { get; set; }
        public DateTime? DateOfStart { get; set; }
        public DateTime DateOfApplication { get; set; }
        public DateTime? DeadLine { get; set; }
        public DateTime? EndDate { get; set; }
        public int ClientId { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
        public bool IsCompleted { get; set; }
    }
}
