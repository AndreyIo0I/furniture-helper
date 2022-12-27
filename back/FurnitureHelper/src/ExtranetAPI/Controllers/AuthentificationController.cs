using Domain.UserManagement;
using ExtranetAPI.Models;
using ExtranetAPI.Models.Extensions;
using ExtranetAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace ExtranetAPI.Controllers;

[Route( "authentification" )]
public class AuthentificationController : ControllerBase
{
    private readonly IUserRepository _userRepository;
    private readonly IAuthentificationService _authentificationService;

    public AuthentificationController(
        IUserRepository userRepository,
        IAuthentificationService authentificationService )
    {
        _userRepository = userRepository;
        _authentificationService = authentificationService;
    }

    /// <summary>
    /// Логинация пользователя
    /// </summary>
    /// <param name="accountDto"></param>
    /// <returns></returns>
    [HttpPost( "" )]
    [SwaggerResponse( statusCode: 200, type: typeof( int ), description: "Логинация пользователя" )]
    [SwaggerResponse( statusCode: 401, type: typeof( int ), description: "Не удалось идентифицировать пользователя" )]
    public async Task<IActionResult> Login( [FromBody] AccountDto accountDto )
    {
        User? user = await _userRepository.Find( accountDto.Login, accountDto.Password );

        if ( user == null )
        {
            return Unauthorized();
        }
        
        await _authentificationService.SignInAsync( user, HttpContext );

        return Ok( user.ToDto() );
    }

    /// <summary>
    /// Выход пользователя
    /// </summary>
    /// <returns></returns>
    [HttpPost( "/logout" )]
    [SwaggerResponse( statusCode: 200, type: typeof( int ), description: "Выход пользователя" )]
    public async Task<IActionResult> Logout()
    {
        await _authentificationService.SignOutAsync( HttpContext );

        return Ok();
    }
}