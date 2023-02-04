using Domain.BaseEntity;

namespace Domain.UserManagement;

public interface IUserRepository: IRepository<User>
{
    Task<User> Get(int id);
    
    Task<User?> Find( string login, string password );

    Task<List<User>> Search(string fullNameSearchString);
}