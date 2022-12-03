using Domain.ProjectManagement;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace ExtranetAPI.Controllers
{
    [Route( "project" )]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectRepository _projectRepository;

        public ProjectController( IProjectRepository projectRepository )
        {
            _projectRepository = projectRepository;
        }

        [HttpGet( "{projectId}" )]
        public async Task<IActionResult> GetProject(
              [FromRoute, Required] int projectId )
        {
            Project project = await _projectRepository.GetById( projectId );

            return Ok( project );
        }
    }
}
