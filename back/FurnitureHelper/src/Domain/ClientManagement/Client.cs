namespace Domain.ClientManagement
{
    public class Client
    {
        public int Id { get; private set; }
        public string Name { get; private set; }
        public string CommunicationChannel { get; private set; }
        public string PhoneNumber { get; private set; }
        public string Mail { get; private set; }
        public string Description { get; private set; }

        public Client( string name, string communicationChannel, string phoneNumber, string mail, string description )
        {
            Name = name;
            CommunicationChannel = communicationChannel;
            PhoneNumber = phoneNumber;
            Mail = mail;
            Description = description;
        }

        public void Update( Client newClient )
        {
            Name = newClient.Name;
            CommunicationChannel = newClient.CommunicationChannel;
            PhoneNumber = newClient.PhoneNumber;
            Mail = newClient.Mail;
            Description = newClient.Description;
        }
    }
}
