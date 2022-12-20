using Domain.BaseEntity;

namespace Domain.ProjectManagement
{
    public interface IProjectBudgetRepository : IRepository<ProjectBudget>
    {
        public Task<ProjectBudget> GetByProjectId( int projectId );
        public Task RemoveProjectBudgetByProjectId( int projectId );
    }
}
