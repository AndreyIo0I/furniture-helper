using Domain.UserManagement;

namespace ExtranetAPI.Services;

public interface IAuthentificationService
{
    Task SignInAsync(User user, HttpContext httpContext);
    Task SignOutAsync( HttpContext httpContext );
}