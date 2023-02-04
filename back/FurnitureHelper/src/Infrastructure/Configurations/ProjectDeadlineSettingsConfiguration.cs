using Domain.ProjectManagement;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations
{
    internal class ProjectDeadlineSettingsConfiguration : IEntityTypeConfiguration<ProjectDeadlineSettings>
    {
        public void Configure( EntityTypeBuilder<ProjectDeadlineSettings> builder )
        {
            builder.ToTable( "project_deadline_settings" ).HasKey( x => x.Id );
            builder.Property( x => x.Id ).ValueGeneratedNever();
            builder.Property( item => item.DaysForDeadlineYellow ).IsRequired();
            builder.Property( item => item.DaysForDeadlineRed ).IsRequired();
            builder.Property( item => item.DefaultProjectDurationDays ).IsRequired();
            builder.HasData( new ProjectDeadlineSettings { Id = 1 } );
        }
    }
}
