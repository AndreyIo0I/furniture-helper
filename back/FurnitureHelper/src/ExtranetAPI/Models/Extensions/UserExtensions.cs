using Domain.UserManagement;

namespace ExtranetAPI.Models.Extensions;

public static class UserExtensions
{
    public static UserDto ToDto( this User user )
    {
        return new UserDto
        {
            Id = user.Id,
            Email = user.Email,
            FullName = user.FullName,
            Password = user.Password,
            Role = (int) user.Role
            
        };
    }

    public static User ToDomain( this UserDto userDto )
    {
        return new User(
            userDto.Email,
            userDto.Password,
            userDto.FullName,
            (UserRole) userDto.Role
            );
    }
}