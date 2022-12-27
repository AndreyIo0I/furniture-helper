using Domain.BaseEntity;

namespace Domain.CostsManagement
{
    public interface IBuisnessCostRepository : IRepository<BuisnessCost>
    {
        public Task<List<BuisnessCost>> GetAll();
        public Task<BuisnessCost> GetById( int id );
    }
}
