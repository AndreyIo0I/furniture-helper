using Domain.CostsManagement;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations
{
    internal class BuisnessCostConfiguration : IEntityTypeConfiguration<BuisnessCost>
    {
        public void Configure( EntityTypeBuilder<BuisnessCost> builder )
        {
            builder.ToTable( "buisness_cost" )
                .HasKey( x => x.Id );
            builder.Property( x => x.Name ).IsRequired();
            builder.Property( x => x.Amount ).IsRequired();
            builder.Property( x => x.Date ).IsRequired();
        }
    }
}
