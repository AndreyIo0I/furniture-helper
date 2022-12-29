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
            builder.Property( item => item.ContractNumber ).IsRequired();
            builder.Property( item => item.DateOfStart ).IsRequired();
            builder.Property( item => item.DeadLine ).IsRequired();
            builder.Property( item => item.ClientId ).IsRequired();
            builder.Property( item => item.Description ).IsRequired();
            builder.Property( item => item.IsCompleted ).IsRequired().HasDefaultValue( false );
            builder.Property( item => item.IsStopped ).IsRequired().HasDefaultValue( false );
            builder.Property( item => item.EndDate );
        }
    }
}