using Domain.UserManagement;
using Infrastructure.Foundation.EntityFramwork;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class UserRepository : Repository<User>, IUserRepository
{
    public UserRepository( FurnitureHelperDbContext context ) : base( context )
    {
    }

    public async Task<User> Get(int id)
    {
        return await Entities.SingleAsync( x => x.Id == id );
    }

    public async Task<User?> Find(string login, string password)
    {
        return await Entities.SingleOrDefaultAsync(x => x.Email == login && x.Password == password);
    }

    public async Task<List<User>> Search( string fullNameSearchString )
    {
        string expression = $"%{fullNameSearchString}%";
        
        return await Entities.Where(x => EF.Functions.Like( x.FullName, fullNameSearchString) ).ToListAsync();
    }
}