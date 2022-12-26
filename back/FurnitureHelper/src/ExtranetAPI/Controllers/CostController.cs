using Application.Foundation;
using Domain.CostsManagement;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.ComponentModel.DataAnnotations;

namespace ExtranetAPI.Controllers
{
    [Route( "costs" )]
    public class CostController : ControllerBase
    {
        private readonly ICostRepository _costRepository;
        private readonly IUnitOfWork _unitOfWork;

        public CostController( ICostRepository costRepository, IUnitOfWork unitOfWork )
        {
            _costRepository = costRepository;
            _unitOfWork = unitOfWork;
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
    }
}
