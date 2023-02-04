using Domain.ClientManagement;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations
{
    public class ClientConfiguration : IEntityTypeConfiguration<Client>
    {
        public void Configure( EntityTypeBuilder<Client> builder )
        {
            builder.ToTable( "client" )
                .HasKey( item => item.Id );
            builder.Property( item => item.Name ).IsRequired();
            builder.Property( item => item.CommunicationChannel ).IsRequired();
            builder.Property( item => item.Mail ).IsRequired();
            builder.Property( item => item.PhoneNumber ).IsRequired();
            builder.Property( item => item.Description ).IsRequired();
        }
    }
}
