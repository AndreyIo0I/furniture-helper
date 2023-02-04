using Domain.BaseEntity;

namespace Domain.ProjectManagement
{
    public interface IProjectStageRepository : IRepository<ProjectStage>
    {
        public Task<List<ProjectStage>> GetByProjectId( int projectId );
        public Task<ProjectStage> Get( int id, int projectId );
    }
}
