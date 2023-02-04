using Application.Foundation;
using Domain.ProjectManagement;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.ComponentModel.DataAnnotations;

namespace ExtranetAPI.Controllers
{
    [Authorize]
    [Route( "project-deadline-settings" )]
    public class ProjectDeadlineController : ControllerBase
    {
        private readonly IProjectDeadlineSettingsRepository _settingsRepository;
        private readonly IUnitOfWork _unitOfWork;

        public ProjectDeadlineController( IProjectDeadlineSettingsRepository settingsRepository, IUnitOfWork unitOfWork )
        {
            _settingsRepository = settingsRepository;
            _unitOfWork = unitOfWork;
        }

        /// <summary>
        /// Получить текущий дедлайн
        /// </summary>
        /// <returns></returns>
        [HttpGet( "" )]
        [SwaggerResponse( statusCode: 200, type: typeof( ProjectDeadlineSettings ), description: "Получить проект по идентификатору" )]
        public async Task<IActionResult> GetProjectDeadlineSettings()
        {
            ProjectDeadlineSettings result = await _settingsRepository.Get();

            return Ok( result );
        }

        /// <summary>
        /// Обновить информацию по дедлайну
        /// </summary>
        /// <param name="projectDeadlineSettings"></param>
        /// <returns></returns>
        [Authorize( Roles = "Admin, Owner" )]
        [HttpPost( "project-deadline-settings-updating" )]
        [SwaggerResponse( statusCode: 200, type: typeof( int ), description: "Обновить основную информацию по проекту" )]
        public async Task<IActionResult> UpdateProjectDeadlineSettings(
            [FromBody, Required] ProjectDeadlineSettings projectDeadlineSettings )
        {
            ProjectDeadlineSettings settings = await _settingsRepository.Get();
            settings.Update( projectDeadlineSettings );
            await _unitOfWork.Commit();

            return Ok();
        }
    }
}
