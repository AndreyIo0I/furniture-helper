namespace Domain.UserManagement;

public class User
{
    public User( string email, string password, string fullName, UserRole role )
    {
        Email = email;
        Password = password;
        FullName = fullName;
        Role = role;
    }
    
    public int Id { get; private set; }
    
    public string Email { get; private set; }
    
    public string FullName { get; private set; }

    public string Password { get; private set; }
    
    public UserRole Role { get; private set; }

    public void Update( User newUser )
    {
        Email = newUser.Email;
        FullName = newUser.FullName;
        Password = String.IsNullOrEmpty(newUser.Password) ? Password : newUser.Password;
        Role = newUser.Role;
    }
}