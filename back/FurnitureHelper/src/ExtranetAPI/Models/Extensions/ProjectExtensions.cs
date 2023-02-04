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
                ProjectType = project.ProjectType,
                ContractNumber = project.ContractNumber,
                DateOfStart = project.DateOfStart,
                DateOfApplication = project.DateOfApplication,
                EndDate = project.EndDate,
                DeadLine = project.DeadLine,
                Description = project.Description,
                ClientId = project.ClientId,
                IsCompleted = project.IsCompleted,
                Address = project.Address,
            };
        }

        public static Project ToDomain( this ProjectDto project )
        {
            return new Project( 
                project.ProjectType,
                project.DateOfApplication,
                project.ClientId,
                project.Description,
                project.Address );
        }
    }
}
