using Domain.BaseEntity;

namespace Domain.ProjectManagement
{
    public interface IProjectBudgetRepository : IRepository<ProjectBudget>
    {
        public Task<ProjectBudget> GetByProjectId( int projectId );
        public Task<IReadOnlyList<ProjectBudget>> GetByProjectIds( List<int> projectIds );
        public Task RemoveProjectBudgetByProjectId( int projectId );
    }
}
