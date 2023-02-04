using Domain.BaseEntity;

namespace Domain.ProjectManagement
{
    public interface IProjectDeadlineSettingsRepository : IRepository<ProjectDeadlineSettings>
    {
        public Task<ProjectDeadlineSettings> Get();
    }
}
