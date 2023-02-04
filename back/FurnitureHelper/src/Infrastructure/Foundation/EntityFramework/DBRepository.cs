namespace Infrastructure.Foundation.EntityFramwork
{
    public class DBRepository
    {
        protected FurnitureHelperDbContext Context { get; }

        public DBRepository( FurnitureHelperDbContext context )
        {
            Context = context;
        }
    }
}
