namespace ExtranetAPI.Models
{
    public class ClientDto
    {
        public int Id { get; set; }
        public string Name { get;  set; }
        public string? CommunicationChannel { get;  set; }
        public string? PhoneNumber { get;  set; }
        public string? Mail { get;  set; }
        public string? Description { get;  set; }
    }
}
