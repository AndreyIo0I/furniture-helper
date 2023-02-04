using Domain.ProjectManagement;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations
{
    internal class ProjectStageConfiguration : IEntityTypeConfiguration<ProjectStage>
    {
        public void Configure( EntityTypeBuilder<ProjectStage> builder )
        {
            builder.ToTable( "project_stage" ).HasKey( item => new { item.Id, item.ProjectId } );
            builder.Property( item => item.ProjectId ).IsRequired();
            builder.Property( item => item.Id ).IsRequired().ValueGeneratedNever();
            builder.Property( item => item.Name ).IsRequired();
            builder.Property( item => item.Description ).IsRequired();
            builder.Property( item => item.ProjectStageCode ).IsRequired();
            builder.Property( item => item.IsCompleted ).IsRequired();

            builder.HasOne<Project>()
                .WithMany()
                .HasForeignKey( x => x.ProjectId )
                .OnDelete( DeleteBehavior.Cascade );
        }
    }
}