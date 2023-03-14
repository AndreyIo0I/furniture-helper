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

        public async Task<IReadOnlyList<ProjectBudget>> GetAll()
        {
            return await Entities.ToListAsync();
        }

        public async Task<ProjectBudget> GetByProjectId( int projectId )
        {
            return await Entities.FirstOrDefaultAsync( item => item.ProjectId == projectId );
        }

        public async Task<IReadOnlyList<ProjectBudget>> GetByProjectIds(List<int> projectIds)
        {
            return await Entities.Where( x => projectIds.Contains( x.ProjectId ) ).ToListAsync();
        }

        public async Task RemoveProjectBudgetByProjectId( int projectId )
        {
            ProjectBudget projectBudget = await Entities.FirstOrDefaultAsync( item => item.ProjectId == projectId );
            Entities.Remove( projectBudget );
        }
    }
}
