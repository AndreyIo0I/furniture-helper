using Domain.UserManagement;
using ExtranetAPI.Models;
using ExtranetAPI.Models.Extensions;
using ExtranetAPI.Services;
using ExtranetAPI.Services.Builders;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace ExtranetAPI.Controllers;

[Route( "authentification" )]
public class AuthentificationController : ControllerBase
{
    private readonly IUserRepository _userRepository;
    private readonly IAuthentificationService _authentificationService;
    private readonly IPasswordCryptionService _passwordCryptionService;
    private readonly IUserBuilder _userBuilder;

    public AuthentificationController(
        IUserRepository userRepository,
        IAuthentificationService authentificationService,
        IPasswordCryptionService passwordCryptionService,
        IUserBuilder userBuilder )
    {
        _userRepository = userRepository;
        _authentificationService = authentificationService;
        _passwordCryptionService = passwordCryptionService;
        _userBuilder = userBuilder;
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
        User? user = await _userRepository.Find( accountDto.Login, _passwordCryptionService.EncryptionPassword( accountDto.Password ) );

        if ( user == null )
        {
            return Unauthorized();
        }
        
        await _authentificationService.SignInAsync( user, HttpContext );

        return Ok( _userBuilder.BuildUserDto( user ) );
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