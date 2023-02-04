using System.Security.Claims;
using Domain.UserManagement;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace ExtranetAPI.Services;

public class AuthentificationService : IAuthentificationService
{
    public async Task SignInAsync( User user, HttpContext httpContext )
    {
        var claims = new List<Claim>
        {
            new ( ClaimsIdentity.DefaultNameClaimType, user.Email ),
            new ( ClaimsIdentity.DefaultNameClaimType, user.Password ),
            new ( ClaimsIdentity.DefaultRoleClaimType, user.Role.ToString() )
        };

        ClaimsIdentity claimsIdentity = new ClaimsIdentity( claims, CookieAuthenticationDefaults.AuthenticationScheme );

        await httpContext.SignInAsync(
            CookieAuthenticationDefaults.AuthenticationScheme,
            new ClaimsPrincipal( claimsIdentity ) );
    }

    public async Task SignOutAsync( HttpContext httpContext )
    {
        await httpContext.SignOutAsync();
    }
}