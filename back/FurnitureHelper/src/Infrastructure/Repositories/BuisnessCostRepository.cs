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

        public async Task<IReadOnlyList<BuisnessCost>> GetAll(DateTime startDate, DateTime endDate)
        {
            return await Entities.Where(x => x.Date >= startDate && x.Date <= endDate).ToListAsync();
        }

        public async Task<IReadOnlyList<BuisnessCost>> GetAll(List<int> ids)
        {
            return await Entities.Where(x => ids.Contains(x.Id)).ToListAsync();
        }
    }
}
