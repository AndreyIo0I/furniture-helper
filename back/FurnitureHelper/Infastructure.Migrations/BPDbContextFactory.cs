using Infrastructure.Foundation.EntityFramwork;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Infastructure.Migrations
{
    public class FurnitureHelperDbContextFactory : IDesignTimeDbContextFactory<FurnitureHelperDbContext>
    {
        public FurnitureHelperDbContext CreateDbContext( string[] args )
        {
            IConfiguration config = GetConfig();
            string connectionString = config.GetConnectionString( "FurnitureHelper" );
            var optionalBuilder = new DbContextOptionsBuilder<FurnitureHelperDbContext>();

            optionalBuilder.UseNpgsql( connectionString, assembly => assembly.MigrationsAssembly( "Infastructure.Migrations" ) );

            return new FurnitureHelperDbContext( optionalBuilder.Options );
        }

        private IConfiguration GetConfig()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath( Directory.GetCurrentDirectory() )
                .AddJsonFile( "appsettings.json" )
                .AddJsonFile( $"appsettings.{Environment.GetEnvironmentVariable( "ASPNETCORE_ENVIRONMENT" )}.json", true );

            return builder.Build();
        }
    }
}
