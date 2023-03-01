using Application.Foundation;
using Domain.CostsManagement;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.ComponentModel.DataAnnotations;

namespace ExtranetAPI.Controllers
{
    [Authorize]
    [Route( "buisness-costs" )]
    public class BuisnessCostController : ControllerBase
    {
        private readonly IBuisnessCostRepository _buisnessCostRepository;
        private readonly IUnitOfWork _unitOfWork;

        public BuisnessCostController( IBuisnessCostRepository buisnessCostRepository, IUnitOfWork unitOfWork )
        {
            _buisnessCostRepository = buisnessCostRepository;
            _unitOfWork = unitOfWork;
        }

        /// <summary>
        /// Получить все бизнесовые издержки
        /// </summary>
        /// <returns></returns>
        [HttpGet( "" )]
        [SwaggerResponse( statusCode: 200, type: typeof( List<BuisnessCost> ), description: "Получить все издержки" )]
        public async Task<IActionResult> GetCosts()
        {
            IReadOnlyList<BuisnessCost> costs = await _buisnessCostRepository.GetAll();

            return Ok( costs );
        }

        /// <summary>
        /// Создать бизнесовую издержку
        /// </summary>
        /// <param name="costDto"></param>
        /// <returns></returns>
        [HttpPost]
        [SwaggerResponse( statusCode: 200, type: typeof( int ), description: "Создать издержку" )]
        public async Task<IActionResult> AddCost( [FromBody, Required] BuisnessCost costDto )
        {
            _buisnessCostRepository.Add( costDto );
            await _unitOfWork.Commit();

            return Ok( costDto.Id );
        }

        /// <summary>
        /// Обновить бизнесовую издержку
        /// </summary>
        /// <param name="costDto"></param>
        /// <param name="costId"></param>
        /// <returns></returns>
        [Authorize( Roles = "Admin, Owner" )]
        [HttpPost( "{costId}/cost-updating" )]
        [SwaggerResponse( statusCode: 200, type: typeof( int ), description: "Обновить издержку" )]
        public async Task<IActionResult> UpdadeCost(
            [FromRoute, Required] int costId,
            [FromBody, Required] BuisnessCost costDto )
        {
            BuisnessCost cost = await _buisnessCostRepository.GetById( costId );
            cost.Update( costDto );
            await _unitOfWork.Commit();

            return Ok( costDto.Id );
        }

        /// <summary>
        /// Удалить бизнесовую издержку
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize( Roles = "Admin, Owner" )]
        [HttpDelete( "{id}" )]
        [SwaggerResponse( statusCode: 200, type: typeof( int ), description: "Удалить издержку" )]
        public async Task<IActionResult> DeleteCost( [FromRoute, Required] int id )
        {
            BuisnessCost? cost = await _buisnessCostRepository.GetById( id );
            if ( cost == null )
            {
                return BadRequest();
            }

            _buisnessCostRepository.Remove( cost );
            await _unitOfWork.Commit();

            return Ok();
        }
    }
}
