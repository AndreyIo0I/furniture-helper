using Microsoft.EntityFrameworkCore;

namespace Infastructure.Migrations
{
    class Program
    {
        static void Main( string[] args )
        {
            Console.WriteLine( "Before migration" );
            new FurnitureHelperDbContextFactory().CreateDbContext( args ).Database.Migrate();
            Console.WriteLine( "After migration" );
        }
    }
}
