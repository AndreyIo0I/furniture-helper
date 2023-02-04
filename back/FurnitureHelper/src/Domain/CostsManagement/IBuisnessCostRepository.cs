using Domain.BaseEntity;

namespace Domain.CostsManagement
{
    public interface IBuisnessCostRepository : IRepository<BuisnessCost>
    {
        public Task<List<BuisnessCost>> GetAll();
        public Task<BuisnessCost> GetById( int id );
        public Task<IReadOnlyList<BuisnessCost>> GetAll( DateTime startDate, DateTime endDate );
        public Task<IReadOnlyList<BuisnessCost>> GetAll( List<int> ids );
    }
}
