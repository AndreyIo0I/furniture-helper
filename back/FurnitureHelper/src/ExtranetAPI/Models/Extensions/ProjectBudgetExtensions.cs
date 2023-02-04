using Domain.ProjectManagement;

namespace ExtranetAPI.Models.Extensions
{
    public static class ProjectBudgetExtensions
    {
        public static ProjectBudgetDto ToDto( this ProjectBudget projectBudget )
        {
            return new ProjectBudgetDto
            {
                Id = projectBudget.Id,
                ProjectId = projectBudget.ProjectId,
                ProjectCost = projectBudget.ProjectCost,
                CostPayments = projectBudget.CostPayments,
                ClientPayments = projectBudget.ClientPayments,
            };
        }

        public static ProjectBudget ToDomain( this ProjectBudgetDto projectBudgetDto )
        {
            return new ProjectBudget(
                projectBudgetDto.ProjectId,
                projectBudgetDto.ProjectCost,
                projectBudgetDto.ClientPayments,
                projectBudgetDto.CostPayments );
        }
    }
}
