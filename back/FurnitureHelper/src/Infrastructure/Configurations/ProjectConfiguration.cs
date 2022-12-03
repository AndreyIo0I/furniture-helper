using Domain.ProjectManagement;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations
{
    internal class ProjectConfiguration : IEntityTypeConfiguration<Project>
    {
        public void Configure( EntityTypeBuilder<Project> builder )
        {
            builder.ToTable( "project" )
                .HasKey( item => item.Id );
            builder.Property( item => item.Name ).IsRequired();
        }
    }
}