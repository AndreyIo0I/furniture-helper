using Application.Foundation;
using Domain.CostsManagement;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using Domain.ProjectManagement;

namespace ExtranetAPI.Controllers
{
    [Authorize]
    [Route( "costs" )]
    public class CostController : ControllerBase
    {
        private readonly ICostRepository _costRepository;
        private readonly IProjectBudgetRepository _projectBudgetRepository;
        private readonly IUnitOfWork _unitOfWork;

        public CostController( ICostRepository costRepository, IUnitOfWork unitOfWork, IProjectBudgetRepository projectBudgetRepository )
        {
            _costRepository = costRepository;
            _unitOfWork = unitOfWork;
            _projectBudgetRepository = projectBudgetRepository;
        }

        /// <summary>
        /// Получить издержку по идентификатору
        /// </summary>
        /// <param name="costId"></param>
        /// <returns></returns>
        [HttpGet( "{costId}" )]
        [SwaggerResponse( statusCode: 200, type: typeof( Cost ), description: "Получить издержку по идентификатору" )]
        public async Task<IActionResult> GetCost(
            [FromRoute, Required] int costId )
        {
            Cost cost = await _costRepository.Get( costId );

            return Ok( cost );
        }

        /// <summary>
        /// Получить все издержки
        /// </summary>
        /// <returns></returns>
        [HttpGet( "" )]
        [SwaggerResponse( statusCode: 200, type: typeof( List<Cost> ), description: "Получить все издержки" )]
        public async Task<IActionResult> GetCosts()
        {
            IReadOnlyList<Cost> costs = await _costRepository.GetAll();

            return Ok( costs );
        }

        /// <summary>
        /// Создать издержку
        /// </summary>
        /// <param name="costDto"></param>
        /// <returns></returns>
        [HttpPost( "" )]
        [SwaggerResponse( statusCode: 200, type: typeof( int ), description: "Создать издержку" )]
        public async Task<IActionResult> AddCost(
            [FromBody, Required] Cost costDto )
        {
            _costRepository.Add( costDto );
            await _unitOfWork.Commit();

            return Ok( costDto.Id );
        }

        /// <summary>
        /// Обновить издержку
        /// </summary>
        /// <param name="costDto"></param>
        /// <param name="costId"></param>
        /// <returns></returns>
        [Authorize( Roles = "Admin, Owner" )]
        [HttpPost( "{costId}/cost-updating" )]
        [SwaggerResponse( statusCode: 200, type: typeof( int ), description: "Обновить издержку" )]
        public async Task<IActionResult> UpdadeCost(
            [FromRoute, Required] int costId,
            [FromBody, Required] Cost costDto )
        {
            Cost cost = await _costRepository.Get( costId );
            cost.Update( costDto );
            await _unitOfWork.Commit();

            return Ok( costDto.Id );
        }

        /// <summary>
        /// Удалить издержку
        /// </summary>
        /// <param name="costId"></param>
        /// <returns></returns>
        [Authorize( Roles = "Admin, Owner" )]
        [HttpDelete( "{costId}" )]
        [SwaggerResponse( statusCode: 200, type: typeof( int ), description: "Удалить издержку" )]
        public async Task<IActionResult> DeleteCost(
            [FromRoute, Required] int costId )
        {
            Cost cost = await _costRepository.Get( costId );
            if ( cost is null )
            {
                return BadRequest( $"Cost with id {costId} is not exist" );
            }

            IReadOnlyList<ProjectBudget> projectBudgets = await _projectBudgetRepository.GetAll();
            ProjectBudget? allProjectBudgetCostPayments = projectBudgets.
                FirstOrDefault( item => item.CostPayments.Where( item => item.CostId == costId ) != new List<CostPayment> { } );

            if( allProjectBudgetCostPayments != null )
            {
                return BadRequest( $"Cost with id {costId} is used" );
            }

            _costRepository.Remove( cost );
            await _unitOfWork.Commit();

            return Ok();
        }
    }
}
