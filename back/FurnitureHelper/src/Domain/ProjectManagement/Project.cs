namespace Domain.ProjectManagement
{
    public class Project
    {
        public int Id { get; private set; }
        public string Name { get; private set; }
        public string ContractNumber { get; private set; }
        public DateTime DateOfStart { get; private set; }
        public DateTime DeadLine { get; private set; }
        public int ClientId { get; private set; }
        public string Description { get; private set; }
        public bool IsCompleted { get; private set; }
        public bool IsStopped { get; private set; }

        public Project( string name, string contractNumber, DateTime dateOfStart, DateTime deadLine, int clientId, string description )
        {
            Name = name;
            ContractNumber = contractNumber;
            DateOfStart = dateOfStart;
            DeadLine = deadLine;
            ClientId = clientId;
            Description = description;
            IsCompleted = false;
            IsStopped = false;
        }

        public void Update( Project newProject )
        {
            Name = newProject.Name;
            ContractNumber = newProject.ContractNumber;
            DateOfStart = newProject.DateOfStart;
            DeadLine = newProject.DeadLine;
            ClientId = newProject.ClientId;
            Description = newProject.Description;
        }

        public void Complete()
        {
            IsCompleted = true;
        }

        public void Stop()
        {
            IsStopped = true;
        }

        public void Run()
        {
            IsStopped = false;
        }
    }
}
