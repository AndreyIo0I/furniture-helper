using Domain.ClientManagement;
using Infrastructure.Foundation.EntityFramwork;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    internal class ClientRepository : Repository<Client>, IClientRepository
    {
        public ClientRepository( FurnitureHelperDbContext context ) : base( context )
        {
        }

        public async Task<Client> Get( int id )
        {
            return await Entities.FirstOrDefaultAsync( e => e.Id == id );
        }

        public async Task<IReadOnlyList<Client>> GetAll()
        {
            return await Entities.ToListAsync();
        }
    }
}
