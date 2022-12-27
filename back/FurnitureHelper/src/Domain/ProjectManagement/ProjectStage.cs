namespace Domain.ProjectManagement
{
    public class ProjectStage
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        
        public DateTime? CompletedOn { get; set; }
        public bool IsCompleted { get; set; }

        public static ProjectStage Default( int projectId, string name )
        {
            return new ProjectStage
            {
                ProjectId = projectId,
                Name = name,
                Description = "",
                CompletedOn = null,
                IsCompleted = false
            };
        }

        public void Update( ProjectStage stage )
        {
            Description = stage.Description;
            CompletedOn = stage.CompletedOn;
            IsCompleted = stage.IsCompleted;
        }
    }
}
