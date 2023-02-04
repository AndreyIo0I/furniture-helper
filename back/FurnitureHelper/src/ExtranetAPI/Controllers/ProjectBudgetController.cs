using Application.Foundation;
using Domain.ProjectManagement;
using ExtranetAPI.Models;
using ExtranetAPI.Models.Extensions;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;

namespace ExtranetAPI.Controllers
{
    [Authorize]
    [Route( "project-budgets" )]
    public class ProjectBudgetController : ControllerBase
    {
        private readonly IProjectBudgetRepository _projectBudgetRepository;
        private readonly IProjectRepository _projectRepository;
        private readonly IUnitOfWork _unitOfWork;

        public ProjectBudgetController( IProjectBudgetRepository projectBudgetRepository, IUnitOfWork unitOfWork, IProjectRepository projectRepository )
        {
            _projectBudgetRepository = projectBudgetRepository;
            _unitOfWork = unitOfWork;
            _projectRepository = projectRepository;
        }

        /// <summary>
        /// Получить бюджет по проекту
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns></returns>
        [HttpGet( "{projectId}" )]
        [SwaggerResponse( statusCode: 200, type: typeof( ProjectBudgetDto ), description: "Получить бюджет по проекту" )]
        public async Task<IActionResult> GetProjectBudgetByProjectId(
            [FromRoute, Required] int projectId )
        {
            ProjectBudget projectBudget = await _projectBudgetRepository.GetByProjectId( projectId );
            if ( projectBudget is null )
            {
                Project? project = await _projectRepository.GetById( projectId );

                if ( project is not null )
                {
                    ProjectBudget newProjectBudget = new( projectId, 0, new List<ClientPayment> { }, new List<CostPayment> { } ) ;
                    _projectBudgetRepository.Add( newProjectBudget );
                    await _unitOfWork.Commit();

                    return Ok( newProjectBudget.ToDto() );
                }
            }

            return Ok( projectBudget.ToDto() );
        }

        /// <summary>
        /// Обновить бюджет проекта
        /// </summary>
        /// <param name="projectId"></param>
        /// <param name="projectBudgetDto"></param>
        /// <returns></returns>
        [Authorize( Roles = "Admin, Owner" )]
        [HttpPost( "{projectId}/project-budget-updating" )]
        [SwaggerResponse( statusCode: 200, type: typeof( ProjectBudgetDto ), description: "Обновить бюджет проекта" )]
        public async Task<IActionResult> UpdateProjectBudget(
            [FromRoute, Required] int projectId,
            [FromBody, Required] ProjectBudgetDto projectBudgetDto )
        {
            ProjectBudget projectBudget = await _projectBudgetRepository.GetByProjectId( projectId );
            ProjectBudget newProjectBudget = projectBudgetDto.ToDomain();

            projectBudget.Update( newProjectBudget );
            await _unitOfWork.Commit();

            return Ok( projectBudget.ToDto() );
        }
    }
}
