using Domain.ProjectManagement;
using Infrastructure.Foundation.EntityFramwork;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class ProjectRepository : Repository<Project>, IProjectRepository
    {
        public ProjectRepository( FurnitureHelperDbContext context ) : base( context )
        {
        }

        public async Task<Project> GetById( int id )
        {
            return await Entities.FirstOrDefaultAsync( x => x.Id == id );
        }

        public async Task<IReadOnlyList<Project>> GetAll()
        {
            return await Entities.ToListAsync();
        }

        public async Task<IReadOnlyList<Project>> GetAll(DateTime startDate, DateTime endDate)
        {
            return await Entities.Where(x => x.DateOfStart >= startDate && x.DateOfStart <= endDate).ToListAsync();
        }
    }
}
