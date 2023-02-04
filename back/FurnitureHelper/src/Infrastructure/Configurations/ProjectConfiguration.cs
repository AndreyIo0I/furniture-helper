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
            builder.Property( item => item.ProjectType ).IsRequired();
            builder.Property( item => item.Address ).IsRequired();
            builder.Property( item => item.ContractNumber );
            builder.Property( item => item.DateOfApplication ).IsRequired();
            builder.Property( item => item.DateOfStart );
            builder.Property( item => item.EndDate );
            builder.Property( item => item.DeadLine );
            builder.Property( item => item.ClientId ).IsRequired();
            builder.Property( item => item.Description ).IsRequired();
            builder.Property( item => item.IsCompleted ).IsRequired().HasDefaultValue( false );
            builder.Property( item => item.IsStopped ).IsRequired().HasDefaultValue( false );
            builder.Property( item => item.EndDate );
        }
    }
}