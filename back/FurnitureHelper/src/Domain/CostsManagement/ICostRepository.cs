using Domain.BaseEntity;

namespace Domain.CostsManagement
{
    public interface ICostRepository : IRepository<Cost>
    {
        public Task<Cost> Get(int Id);
        public Task<List<Cost>> GetAll();
        public Task<List<Cost>> GetAll(List<int> ids);
    }
}
