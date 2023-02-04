namespace ExtranetAPI.Models;

public class UserDto
{
    public int Id { get; set; }
    public string Email { get; set; }
    public string FullName { get; set; }
    public string Password { get; set; }
    public int Role { get; set; }
}