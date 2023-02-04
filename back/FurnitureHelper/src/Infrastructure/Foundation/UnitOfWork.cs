using Application.Foundation;

namespace Infrastructure.Foundation
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IDbContext _dBContext;

        public UnitOfWork( IDbContext dBContext )
        {
            _dBContext = dBContext;
        }

        public async Task Commit()
        {
            await _dBContext.SaveChangesAsync();
        }
    }
}
