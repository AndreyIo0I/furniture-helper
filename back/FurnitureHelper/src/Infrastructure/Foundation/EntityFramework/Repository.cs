
using Domain.BaseEntity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Foundation.EntityFramwork
{
    public class Repository<TEntity> : IRepository<TEntity>
        where TEntity : class
    {
        protected DbSet<TEntity> Entities { get; }

        public Repository( FurnitureHelperDbContext context )
        {
            Entities = context.Set<TEntity>();
        }

        public void Add( TEntity entity )
        {
            Entities.Add( entity );
        }

        public void Add( IEnumerable<TEntity> entities )
        {
            Entities.AddRange( entities );
        }

        public void Remove( TEntity entity )
        {
            Entities.Remove( entity );
        }

        public void Remove( IEnumerable<TEntity> entities )
        {
            Entities.RemoveRange( entities );
        }
    }
}
