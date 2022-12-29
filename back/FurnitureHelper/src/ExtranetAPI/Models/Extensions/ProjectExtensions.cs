using Domain.ProjectManagement;

namespace ExtranetAPI.Models.Extensions
{
    public static class ProjectExtensions
    {
        public static ProjectDto ToDto( this Project project )
        {
            return new ProjectDto
            {
                Id = project.Id,
                Name = project.Name,
                ContractNumber = project.ContractNumber,
                DateOfStart = project.DateOfStart,
                DeadLine = project.DeadLine,
                Description = project.Description,
                ClientId = project.ClientId,
                IsCompleted = project.IsCompleted
            };
        }

        public static Project ToDomain( this ProjectDto project )
        {
            return new Project( 
                project.Name,
                project.ContractNumber,
                project.DateOfStart,
                project.DeadLine,
                project.ClientId,
                project.Description );
        }
    }
}
