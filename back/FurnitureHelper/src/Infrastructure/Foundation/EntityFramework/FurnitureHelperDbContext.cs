using Infrastructure.Configurations;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Foundation.EntityFramwork
{
    public class FurnitureHelperDbContext : DbContext, IDbContext
    {
        public FurnitureHelperDbContext( DbContextOptions<FurnitureHelperDbContext> options )
            : base( options )
        { }

        static FurnitureHelperDbContext()
        {
        }

        protected override void OnConfiguring( DbContextOptionsBuilder optionsBuilder )
        {
            optionsBuilder.UseSnakeCaseNamingConvention();
        }

        protected override void OnModelCreating( ModelBuilder modelBuilder )
        {
            modelBuilder.ApplyConfiguration( new ProjectConfiguration() );
            modelBuilder.ApplyConfiguration( new ClientConfiguration() );
            modelBuilder.ApplyConfiguration( new CostConfiguration() );
            modelBuilder.ApplyConfiguration( new ProjectBudgetCongifuration() );
            modelBuilder.ApplyConfiguration( new ProjectDeadlineSettingsConfiguration() );
            modelBuilder.ApplyConfiguration( new BuisnessCostConfiguration() );
            modelBuilder.ApplyConfiguration( new ProjectStageConfiguration() );
        }
    }
}
