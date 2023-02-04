using Domain.BaseEntity;

namespace Domain.ClientManagement
{
    public interface IClientRepository : IRepository<Client>
    {
        public Task<Client> Get( int id );
        public Task<IReadOnlyList<Client>> GetAll();
    }
}
