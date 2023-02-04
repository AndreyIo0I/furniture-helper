using Domain.CostsManagement;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations
{
    public class CostConfiguration : IEntityTypeConfiguration<Cost>
    {
        public void Configure( EntityTypeBuilder<Cost> builder )
        {
            builder.ToTable( "cost" )
                .HasKey( item => item.Id );
            builder.Property( item => item.Name ).IsRequired();
        }
    }
}
