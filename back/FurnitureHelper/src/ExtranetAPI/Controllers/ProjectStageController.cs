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

            return Ok( stages.OrderBy( item => item.Id ) );
        }

        /// <summary>
        /// Получить текущий этап по проекту
        /// Возвращаем первый следующий после последнего выполненного этапа, если выполненны все, то возваращаем последний
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns></returns>
        [HttpGet( "{projectId}/current" )]
        [SwaggerResponse( statusCode: 200, type: typeof( ProjectStage ), description: "Получить текущий этап по проекту" )]
        public async Task<IActionResult> GetCurrentProjectStage(
              [FromRoute, Required] int projectId )
        {
            List<ProjectStage> stages = await _projectStageRepository.GetByProjectId( projectId );
            List<ProjectStage>? orderedStages = stages.OrderBy( item => item.Id ).ToList();
            int lastOrderedStageId = orderedStages.Last().Id;
            ProjectStage tempLastCompletedStage = null;

            foreach ( var stage in orderedStages )
            {
                if ( stage.IsCompleted )
                {
                    tempLastCompletedStage = stage;
                }
            }

            if ( tempLastCompletedStage == null )
            {
                return Ok( orderedStages.First() );
            }

            if ( tempLastCompletedStage.Id == lastOrderedStageId )
            {
                return Ok( tempLastCompletedStage );
            }

            return Ok( orderedStages.First( item => item.Id == ( tempLastCompletedStage.Id + 1 ) ) );
        }

        /// <summary>
        /// Обновить основную информацию по этапу проекта
        /// </summary>
        /// <param name="projectStageId"></param>
        /// <param name="stage"></param>
        /// <returns></returns>
        [Authorize( Roles = "Admin, Owner" )]
        [HttpPost( "{projectStageId}/project-stage-updating" )]
        [SwaggerResponse( statusCode: 200, type: typeof( int ), description: "Обновить основную информацию по этапу проекта" )]
        public async Task<IActionResult> UpdateProject(
            [FromRoute, Required] int projectStageId,
            [FromBody, Required] ProjectStage stage )
        {
            ProjectStage existing = await _projectStageRepository.Get( projectStageId, stage.ProjectId );
            existing.Update( stage );
            await _unitOfWork.Commit();

            return Ok();
        }
    }
}
