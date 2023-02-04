using Domain.UserManagement;
using ExtranetAPI.Models;

namespace ExtranetAPI.Services.Builders;

public class UserBuilder : IUserBuilder
{
    private readonly IPasswordCryptionService _passwordCryptionService;

    public UserBuilder( IPasswordCryptionService passwordCryptionService )
    {
        _passwordCryptionService = passwordCryptionService;
    }
    
    public UserDto BuildUserDto( User user )
    {
        return new UserDto
        {
            Id = user.Id,
            Email = user.Email,
            FullName = user.FullName,
            Password = _passwordCryptionService.DecryptionPassword( user.Password ),
            Role = ( int ) user.Role
        };
    }

    public User BuildUser( UserDto userDto )
    {
        return new User(
            userDto.Email,
            _passwordCryptionService.EncryptionPassword( userDto.Password ),
            userDto.FullName,
            ( UserRole ) userDto.Role );
    }
}