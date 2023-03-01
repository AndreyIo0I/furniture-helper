namespace Domain.CostsManagement
{
    public class BuisnessCost
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }

        public void Update( BuisnessCost buisnessCost )
        {
            Name = buisnessCost.Name;
            Amount = buisnessCost.Amount;
            Date = buisnessCost.Date;
        }
    }
}
