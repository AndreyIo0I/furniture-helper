﻿using Application.Foundation;
using Domain.ClientManagement;
using ExtranetAPI.Models;
using ExtranetAPI.Models.Extensions;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.ComponentModel.DataAnnotations;

namespace ExtranetAPI.Controllers
{
    [Route( "clients" )]
    public class ClientController : ControllerBase
    {
        private readonly IClientRepository _clientRepository;
        private readonly IUnitOfWork _unitOfWork;


        public ClientController( IClientRepository clientRepository, IUnitOfWork unitOfWork )
        {
            _clientRepository = clientRepository;
            _unitOfWork = unitOfWork;
        }

        /// <summary>
        /// Получить клиента по идентификатору
        /// </summary>
        /// <param name="clientId"></param>
        /// <returns></returns>
        [HttpGet( "{clientId}" )]
        [SwaggerResponse( statusCode: 200, type: typeof( ClientDto ), description: "Получить клиента по идентификатору" )]
        public async Task<IActionResult> GetClient(
            [FromRoute, Required] int clientId )
        {
            Client client = await _clientRepository.Get( clientId );

            return Ok( client.ToDto() );
        }

        /// <summary>
        /// Получить всех клиентов
        /// </summary>
        /// <returns></returns>
        [HttpGet( "" )]
        [SwaggerResponse( statusCode: 200, type: typeof( List<ProjectDto> ), description: "Получить всех клиентов" )]
        public async Task<IActionResult> GetClients()
        {
            IReadOnlyList<Client> clients = await _clientRepository.GetAll();

            return Ok( clients.Select( item => item.ToDto() ) );
        }

        /// <summary>
        /// Создать клиента
        /// </summary>
        /// <param name="clientDto"></param>
        /// <returns></returns>
        [HttpPost( "" )]
        [SwaggerResponse( statusCode: 200, type: typeof( int ), description: "Создать клиента" )]
        public async Task<IActionResult> AddProject(
            [FromBody, Required] ClientDto clientDto )
        {
            Client client = clientDto.ToDomain();
            _clientRepository.Add( client );
            await _unitOfWork.Commit();

            return Ok();
        }

        /// <summary>
        /// Удалить клиента
        /// </summary>
        /// <param name="clientId"></param>
        /// <returns></returns>
        [HttpDelete( "{clientId}" )]
        [SwaggerResponse( statusCode: 200, type: typeof( int ), description: "Удалить клиента" )]
        public async Task<IActionResult> DeleteProject(
            [FromRoute, Required] int clientId )
        {
            Client client = await _clientRepository.Get( clientId );
            if ( client is null )
            {
                return BadRequest( $"Property with id {clientId} is not exist" );
            }

            _clientRepository.Remove( client );
            await _unitOfWork.Commit();

            return Ok();
        }

        /// <summary>
        /// Обновить основную информацию по клиенту
        /// </summary>
        /// <param name="clientId"></param>
        /// <param name="clientDto"></param>
        /// <returns></returns>
        [HttpPost( "{clientId}/client-updating" )]
        [SwaggerResponse( statusCode: 200, type: typeof( int ), description: "Обновить основную информацию по клиенту" )]
        public async Task<IActionResult> UpdateProject(
            [FromRoute, Required] int clientId,
            [FromBody, Required] ClientDto clientDto )
        {
            Client updatedClient = clientDto.ToDomain();
            Client client = await _clientRepository.Get( clientId );
            client.Update( updatedClient );
            await _unitOfWork.Commit();

            return Ok();
        }
    }
}
