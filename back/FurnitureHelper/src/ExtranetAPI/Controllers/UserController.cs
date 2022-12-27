using Application.Foundation;
using Domain.UserManagement;
using ExtranetAPI.Models;
using ExtranetAPI.Models.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace ExtranetAPI.Controllers;

[Authorize]
[Route( "users" )]
public class UserController : ControllerBase
{
    private readonly IUserRepository _userRepository;
    private readonly IUnitOfWork _unitOfWork;    
    
    public UserController(
        IUserRepository userRepository,
        IUnitOfWork unitOfWork )
    {
        _userRepository = userRepository;
        _unitOfWork = unitOfWork;
    }

    /// <summary>
    /// Получение пользователя
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpGet("{id}")]
    [SwaggerResponse( statusCode: 200, type: typeof( UserDto ), description: "Получение пользователя" )]
    public async Task<IActionResult> Get( [FromRoute] int id )
    {
        User user = await _userRepository.Get( id );

        return Ok( user.ToDto() );
    }

    /// <summary>
    /// Поиск пользователей
    /// </summary>
    /// <param name="fullNameSearchPattern"></param>
    /// <returns></returns>
    [Authorize( Roles = "Admin, Owner" )]
    [HttpPost("search")]
    [SwaggerResponse( statusCode: 200, type: typeof( List<UserDto>), description: "Поиск пользователей" )]
    public async Task<IActionResult> Search( [FromQuery] string fullNameSearchPattern )
    {
        List<User> users = await _userRepository.Search( fullNameSearchPattern );

        return Ok( users.Select( x => x.ToDto() ) );
    }

    /// <summary>
    /// Создание пользователя
    /// </summary>
    /// <param name="userDto"></param>
    /// <returns></returns>
    [Authorize( Roles = "Admin,Owner" )]
    [HttpPost("")]
    [SwaggerResponse( statusCode: 200, type: typeof( int ), description: "Создание пользователя" )]
    public async Task<IActionResult> Create( [FromBody] UserDto userDto )
    {
        User user = userDto.ToDomain();
        
        _userRepository.Add( user );
        await _unitOfWork.Commit();
        
        return Ok();
    }

    /// <summary>
    /// Обновление пользователя
    /// </summary>
    /// <param name="userDto"></param>
    /// <returns></returns>
    [HttpPut("")]
    [SwaggerResponse( statusCode: 200, type: typeof( int ), description: "Обновление пользователя" )]
    public async Task<IActionResult> Update( [FromBody] UserDto userDto )
    {
        User user = userDto.ToDomain();
        
        _userRepository.Update( user );
        await _unitOfWork.Commit();
        
        return Ok();
    }

    /// <summary>
    /// Удаление пользователя
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [Authorize( Roles = "Admin, Owner" )]
    [HttpDelete("{id}")]
    [SwaggerResponse( statusCode: 200, type: typeof( int ), description: "Удаление пользователя" )]
    public async Task<IActionResult> Delete( [FromRoute] int id )
    {
        User user = await _userRepository.Get(id);
        
        _userRepository.Remove( user );
        await _unitOfWork.Commit();
        
        return Ok();
    }
}