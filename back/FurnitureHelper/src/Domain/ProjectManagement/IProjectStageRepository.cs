using Domain.BaseEntity;

namespace Domain.ProjectManagement
{
    public interface IProjectStageRepository : IRepository<ProjectStage>
    {
        public Task<List<ProjectStage>> GetByProjectId( int projectId );
        public Task<List<ProjectStage>> GetByProjectIds( List<int> projectIds );
        public Task<ProjectStage> Get( int id, int projectId );
    }
}
