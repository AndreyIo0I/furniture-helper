using Application.Foundation;
using Domain.ProjectManagement;
using ExtranetAPI.Models;
using ExtranetAPI.Models.Extensions;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.ComponentModel.DataAnnotations;

namespace ExtranetAPI.Controllers
{
    [Route( "projects" )]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IProjectBudgetRepository _projectBudgetRepository;
        private readonly IUnitOfWork _unitOfWork;

        public ProjectController(
            IProjectRepository projectRepository,
            IUnitOfWork unitOfWork,
            IProjectBudgetRepository projectBudgetRepository )
        {
            _projectRepository = projectRepository;
            _unitOfWork = unitOfWork;
            _projectBudgetRepository = projectBudgetRepository;
        }

        /// <summary>
        /// Получить проект по идентификатору
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns></returns>
        [HttpGet( "{projectId}" )]
        [SwaggerResponse( statusCode: 200, type: typeof( ProjectDto ), description: "Получить проект по идентификатору" )]
        public async Task<IActionResult> GetProject(
              [FromRoute, Required] int projectId )
        {
            Project project = await _projectRepository.GetById( projectId );

            return Ok( project.ToDto() );
        }

        /// <summary>
        /// Получить все проекты
        /// </summary>
        /// <returns></returns>
        [HttpGet( "" )]
        [SwaggerResponse( statusCode: 200, type: typeof( List<ProjectDto> ), description: "Получить все проекты" )]
        public async Task<IActionResult> GetProjects()
        {
            IReadOnlyList<Project> project = await _projectRepository.GetAll();

            return Ok( project.Select( item => item.ToDto() ) );
        }

        /// <summary>
        /// Создать проект
        /// </summary>
        /// <param name="projectDto"></param>
        /// <returns></returns>
        [HttpPost( "" )]
        [SwaggerResponse( statusCode: 200, type: typeof( int ), description: "Создать проект" )]
        public async Task<IActionResult> AddProject(
            [FromBody, Required] ProjectDto projectDto )
        {
            Project project = projectDto.ToDomain();
            _projectRepository.Add( project );
            await _unitOfWork.Commit();

            ProjectBudget newProjectBudget = new( project.Id, 0, new List<ClientPayment> { }, new List<CostPayment> { } );
            _projectBudgetRepository.Add( newProjectBudget );
            await _unitOfWork.Commit();

            return Ok();
        }

        /// <summary>
        /// Удалить проект
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns></returns>
        [HttpDelete( "{projectId}" )]
        [SwaggerResponse( statusCode: 200, type: typeof( int ), description: "Удалить проект" )]
        public async Task<IActionResult> DeleteProject(
            [FromRoute, Required] int projectId )
        {
            Project project = await _projectRepository.GetById( projectId );
            if ( project is null )
            {
                return BadRequest( $"Property with id {projectId} is not exist" );
            }

            _projectRepository.Remove( project );
            await _projectBudgetRepository.RemoveProjectBudgetByProjectId( projectId );

            await _unitOfWork.Commit();

            return Ok();
        }

        /// <summary>
        /// Обновить основную информацию по проекту
        /// </summary>
        /// <param name="projectId"></param>
        /// <param name="projectDto"></param>
        /// <returns></returns>
        [HttpPost( "{projectId}/project-updating" )]
        [SwaggerResponse( statusCode: 200, type: typeof( int ), description: "Обновить основную информацию по проекту" )]
        public async Task<IActionResult> UpdateProject(
            [FromRoute, Required] int projectId,
            [FromBody, Required] ProjectDto projectDto )
        {
            Project updatedProject = projectDto.ToDomain();
            Project project = await _projectRepository.GetById( projectId );
            project.Update( updatedProject );
            await _unitOfWork.Commit();

            return Ok();
        }
    }
}
