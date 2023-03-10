namespace Domain.ProjectManagement
{
    public class Project
    {
        public int Id { get; private set; }
        public string ProjectType { get; private set; }
        public string ContractNumber { get; private set; }
        public DateTime? DateOfStart { get; private set; }
        public DateTime DateOfApplication { get; private set; }
        public DateTime? DeadLine { get; private set; }
        public DateTime? EndDate { get; private set; }
        public int ClientId { get; private set; }
        public string Address { get; private set; }
        public string Description { get; private set; }
        public bool IsCompleted { get; private set; }
        public bool IsStopped { get; private set; }

        public Project(
            string projectType,
            DateTime dateOfApplication,
            int clientId,
            string description,
            string address )
        {
            ProjectType = projectType;
            DateOfApplication = dateOfApplication;
            ClientId = clientId;
            Description = description;
            IsCompleted = false;
            IsStopped = false;
            Address = address;
            ContractNumber = string.Empty;
        }

        public void Update( Project newProject )
        {
            ProjectType = newProject.ProjectType;
            ClientId = newProject.ClientId;
            Description = newProject.Description;
            DateOfApplication = newProject.DateOfApplication;
            Address = newProject.Address;
        }

        public void ApplyContractNumber( string contractNumber )
        {
            ContractNumber = contractNumber;
        }

        public void ApplyDeadLine( DateTime deadLine )
        {
            DeadLine = deadLine;
        }

        public void ApplyStartDate( DateTime dateOfStart )
        {
            DateOfStart = dateOfStart;
        }

        public void ApplyEndDate( DateTime endDate )
        {
            if ( !DateOfStart.HasValue )
            {
                throw new ArgumentOutOfRangeException( "Can't set end date while start date is null" );
            }
            
            if ( DateOfStart > endDate )
            {
                throw new ArgumentOutOfRangeException($"EndDate: {endDate} must be more then start date: {DateOfStart}");
            }
            
            EndDate = endDate;
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
