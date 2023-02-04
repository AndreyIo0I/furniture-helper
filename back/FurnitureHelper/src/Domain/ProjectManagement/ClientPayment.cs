namespace Domain.ProjectManagement
{
    public class ClientPayment
    {
        public DateTime PaymentDate { get; private set; }
        public decimal Amount { get; private set; }

        public ClientPayment( DateTime paymentDate, decimal amount )
        {
            PaymentDate = paymentDate;
            Amount = amount;
        }
    }
}
