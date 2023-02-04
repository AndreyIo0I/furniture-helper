namespace Domain.ProjectManagement
{
    public class CostPayment
    {
        public int CostId { get; private set; }
        public DateTime PaymentDate { get; private set; }
        public decimal Amount { get; private set; }

        public CostPayment( int costId, DateTime paymentDate, decimal amount )
        {
            CostId = costId;
            PaymentDate = paymentDate;
            Amount = amount;
        }
    }
}
