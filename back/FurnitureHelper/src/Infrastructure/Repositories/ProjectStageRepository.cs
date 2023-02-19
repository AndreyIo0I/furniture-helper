using Domain.ProjectManagement;
using Infrastructure.Foundation.EntityFramwork;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    internal class ProjectStageRepository : Repository<ProjectStage>, IProjectStageRepository
    {
        public ProjectStageRepository( FurnitureHelperDbContext context ) : base( context )
        {
        }

        public async Task<List<ProjectStage>> GetByProjectIds(List<int> projectIds)
        {
            return await Entities.Where(x => projectIds.Contains(x.ProjectId)).ToListAsync();
        }

        public async Task<ProjectStage> Get( int id, int projectId )
        {
            return await Entities.FirstOrDefaultAsync( x => x.Id == id && x.ProjectId == projectId );
        }

        public async Task<List<ProjectStage>> GetByProjectId( int projectId )
        {
            return await Entities.Where( x => x.ProjectId == projectId ).ToListAsync();
        }
    }
}
