using Application.Foundation;
using Domain.ProjectManagement;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.ComponentModel.DataAnnotations;

namespace ExtranetAPI.Controllers
{
    [Authorize]
    [Route( "project-stages" )]
    public class ProjectStageController : ControllerBase
    {
        private readonly IProjectStageRepository _projectStageRepository;
        private readonly IUnitOfWork _unitOfWork;

        public ProjectStageController(
            IProjectStageRepository projectStageRepository,
            IUnitOfWork unitOfWork )
        {
            _projectStageRepository = projectStageRepository;
            _unitOfWork = unitOfWork;
        }

        /// <summary>
        /// Получить этапы проекта
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns></returns>
        [HttpGet( "{projectId}" )]
        [SwaggerResponse( statusCode: 200, type: typeof( List<ProjectStage> ), description: "Получить этапы проекта" )]
        public async Task<IActionResult> GetProjectStages(
              [FromRoute, Required] int projectId )
        {
            List<ProjectStage> stages = await _projectStageRepository.GetByProjectId( projectId );

            return Ok( stages );
        }

        /// <summary>
        /// Обновить основную информацию по этапу проекта
        /// </summary>
        /// <param name="projectStageId"></param>
        /// <param name="stage"></param>
        /// <returns></returns>
        [Authorize( Roles = "Admin, Owner" )]
        [HttpPost( "{projecStageId}/project-stage-updating" )]
        [SwaggerResponse( statusCode: 200, type: typeof( int ), description: "Обновить основную информацию по этапу проекта" )]
        public async Task<IActionResult> UpdateProject(
            [FromRoute, Required] int projectStageId,
            [FromBody, Required] ProjectStage stage )
        {
            ProjectStage existing = await _projectStageRepository.Get( projectStageId );
            existing.Update( stage );
            await _unitOfWork.Commit();

            return Ok();
        }
    }
}
