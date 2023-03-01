namespace Domain.CostsManagement
{
    public class Cost
    {
        public int Id { get; private set; }
        public string Name { get; private set; }

        public Cost( int id, string name )
        {
            Id = id;
            Name = name;
        }

        public void Update( Cost cost )
        {
            Name = cost.Name;
        }
    }
}
