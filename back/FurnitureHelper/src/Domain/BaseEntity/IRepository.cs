namespace Domain.BaseEntity
{
    public interface IAddedRepository<TEntity>
        where TEntity : class
    {
        void Add( TEntity entity );

        void Add( IEnumerable<TEntity> entities );
    }

    public interface IRemovableRepository<TEntity>
        where TEntity : class
    {
        void Remove( TEntity entity );

        void Remove( IEnumerable<TEntity> entities );
    }

    public interface IRepository<TEntity> : IAddedRepository<TEntity>, IRemovableRepository<TEntity>
        where TEntity : class
    { }

}
