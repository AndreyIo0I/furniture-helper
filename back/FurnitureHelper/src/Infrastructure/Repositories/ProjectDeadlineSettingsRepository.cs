using Domain.ProjectManagement;
using Infrastructure.Foundation.EntityFramwork;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    internal class ProjectDeadlineSettingsRepository : Repository<ProjectDeadlineSettings>, IProjectDeadlineSettingsRepository
    {
        public ProjectDeadlineSettingsRepository( FurnitureHelperDbContext context ) : base( context )
        {
        }

        public async Task<ProjectDeadlineSettings> Get()
        {
            return await Entities.FirstAsync();
        }
    }
}
