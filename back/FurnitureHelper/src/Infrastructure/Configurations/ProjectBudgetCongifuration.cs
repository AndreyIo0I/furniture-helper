using Domain.ProjectManagement;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;

namespace Infrastructure.Configurations
{
    internal class ProjectBudgetCongifuration : IEntityTypeConfiguration<ProjectBudget>
    {
        public void Configure( EntityTypeBuilder<ProjectBudget> builder )
        {
            builder.ToTable( "project_budget" )
                .HasKey( item => item.Id );
            builder.Property( item => item.ProjectCost ).IsRequired();
            builder.Property( item => item.ProjectId ).IsRequired();

            builder.Property( item => item.ClientPayments ).HasConversion(
                v => JsonConvert.SerializeObject( v, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore } ),
                v => JsonConvert.DeserializeObject<List<ClientPayment>>( v, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore } ) );

            builder.Property( item => item.CostPayments ).HasConversion(
                v => JsonConvert.SerializeObject( v, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore } ),
                v => JsonConvert.DeserializeObject<List<CostPayment>>( v, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore } ) );
        }
    }
}
