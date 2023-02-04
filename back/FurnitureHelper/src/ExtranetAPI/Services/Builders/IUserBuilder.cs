using Domain.UserManagement;
using ExtranetAPI.Models;

namespace ExtranetAPI.Services.Builders;

public interface IUserBuilder
{
    UserDto BuildUserDto( User user );
    User BuildUser(UserDto userDto);
}