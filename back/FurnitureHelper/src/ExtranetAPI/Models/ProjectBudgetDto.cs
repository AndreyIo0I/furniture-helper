using Domain.ProjectManagement;

namespace ExtranetAPI.Models
{
    public class ProjectBudgetDto
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public decimal ProjectCost { get; set; }
        public List<ClientPayment> ClientPayments { get; set; }
        public List<CostPayment> CostPayments { get; set; }
    }
}
