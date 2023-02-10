using Domain.ClientManagement;

namespace ExtranetAPI.Models.Extensions
{
    public static class ClientExtensions
    {
        public static ClientDto ToDto( this Client client )
        {
            return new ClientDto
            {
                Id = client.Id,
                Name = client.Name,
                Description = client.Description,
                CommunicationChannel = client.CommunicationChannel,
                Mail = client.Mail,
                PhoneNumber = client.PhoneNumber,
            };
        }

        public static Client ToDomain( this ClientDto client )
        {
            return new Client(
                client.Name,
                client.CommunicationChannel ?? "",
                client.PhoneNumber ?? "",
                client.Mail ?? "",
                client.Description ?? "" );
        }
    }
}
