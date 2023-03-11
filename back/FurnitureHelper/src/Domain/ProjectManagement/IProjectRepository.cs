using Domain.BaseEntity;

namespace Domain.ProjectManagement
{
    public interface IProjectRepository : IRepository<Project>
    {
        public Task<Project> GetById( int id );
        public Task<IReadOnlyList<Project>> GetAll();
        public Task<IReadOnlyList<Project>> GetByClientId( int userId );
    }
}
