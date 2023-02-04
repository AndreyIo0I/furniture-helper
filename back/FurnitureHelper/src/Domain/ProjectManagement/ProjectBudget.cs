namespace Domain.ProjectManagement
{
    public class ProjectBudget
    {
        public int Id { get; private set; }
        public int ProjectId { get; private set; }
        public decimal ProjectCost { get; private set; }
        public List<ClientPayment> ClientPayments { get; private set; }
        public List<CostPayment> CostPayments { get; private set; }

        public ProjectBudget( int projectId, decimal projectCost, List<ClientPayment> clientPayments, List<CostPayment> costPayments )
        {
            ProjectId = projectId;
            ProjectCost = projectCost;
            ClientPayments = clientPayments;
            CostPayments = costPayments;
        }

        public void Update( ProjectBudget projectBudget )
        {
            ProjectCost = projectBudget.ProjectCost;
            ClientPayments = projectBudget.ClientPayments;
            CostPayments = projectBudget.CostPayments;
        }
    }
}
