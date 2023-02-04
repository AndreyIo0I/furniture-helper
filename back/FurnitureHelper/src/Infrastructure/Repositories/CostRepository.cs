using Domain.CostsManagement;
using Infrastructure.Foundation.EntityFramwork;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    internal class CostRepository : Repository<Cost>, ICostRepository
    {
        public CostRepository( FurnitureHelperDbContext context ) : base( context )
        {
        }

        public async Task<Cost> Get( int id )
        {
            return await Entities.FirstOrDefaultAsync( item => item.Id == id );
        }

        public async Task<List<Cost>> GetAll()
        {
            return await Entities.ToListAsync();
        }

        public async Task<List<Cost>> GetAll( List<int> ids )
        {
            return await Entities.Where( x => ids.Contains( x.Id ) ).ToListAsync();
        }
    }
}
