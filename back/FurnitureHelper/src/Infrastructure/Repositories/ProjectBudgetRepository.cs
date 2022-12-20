using Domain.ProjectManagement;
using Infrastructure.Foundation.EntityFramwork;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class ProjectBudgetRepository : Repository<ProjectBudget>, IProjectBudgetRepository
    {
        public ProjectBudgetRepository( FurnitureHelperDbContext context ) : base( context )
        {
        }

        public async Task<ProjectBudget> GetByProjectId( int projectId )
        {
            return await Entities.FirstOrDefaultAsync( item => item.ProjectId == projectId );
        }

        public async Task RemoveProjectBudgetByProjectId( int projectId )
        {
            ProjectBudget projectBudget = await Entities.FirstOrDefaultAsync( item => item.ProjectId == projectId );
            Entities.Remove( projectBudget );
        }
    }
}
