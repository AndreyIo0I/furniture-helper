using Domain.UserManagement;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure( EntityTypeBuilder<User> builder )
    {
        builder.ToTable( "user" )
            .HasKey( item => item.Id );
        
        builder.Property( item => item.Email ).IsRequired().HasMaxLength( 30 );
        builder.Property( item => item.FullName ).IsRequired().HasMaxLength( 50 );
        builder.Property( item => item.Password ).IsRequired().HasMaxLength( 40 );
        builder.Property( item => item.Role ).IsRequired();

        builder.HasIndex(item => item.Email).IsUnique();
    }
}