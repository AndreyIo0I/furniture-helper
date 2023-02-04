namespace Domain.ProjectManagement
{
    public class ProjectStage
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public string ProjectStageCode { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        
        public DateTime? CompletedOn { get; set; }
        public bool IsCompleted { get; set; }

        public static ProjectStage Default( int projectStageId, int projectId, string name, string projectStageKind )
        {
            return new ProjectStage
            {
                Id = projectStageId,
                ProjectId = projectId,
                ProjectStageCode = projectStageKind,
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
