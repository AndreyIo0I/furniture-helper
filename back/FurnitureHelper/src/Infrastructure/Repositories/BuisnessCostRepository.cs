using Domain.CostsManagement;
using Infrastructure.Foundation.EntityFramwork;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    internal class BuisnessCostRepository : Repository<BuisnessCost>, IBuisnessCostRepository
    {
        public BuisnessCostRepository( FurnitureHelperDbContext context ) : base( context )
        {
        }

        public async Task<List<BuisnessCost>> GetAll()
        {
            return await Entities.ToListAsync();
        }

        public async Task<BuisnessCost> GetById( int id )
        {
            return await Entities.FirstOrDefaultAsync( x => x.Id == id );
        }
    }
}
