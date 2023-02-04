namespace Infrastructure.Foundation
{
    public interface IDbContext
    {
        Task<int> SaveChangesAsync( CancellationToken cancellationToken = default( CancellationToken ) );
    }
}
