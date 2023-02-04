using Domain.ProjectManagement;

namespace Application.Services
{
    public interface IClientConsistencyDeterminant
    {
        public Task<bool> IsClientExistInSomeProjects( int userId );
    }
    
    public class ClientConsistencyDeterminant : IClientConsistencyDeterminant
    {
        private readonly IProjectRepository _projectRepository;

        public ClientConsistencyDeterminant( IProjectRepository projectRepository )
        {
            _projectRepository = projectRepository;
        }

        public async Task<bool> IsClientExistInSomeProjects( int clientId )
        {
            var projectsByClient = await _projectRepository.GetByClientId( clientId );

            return projectsByClient.Any();
        }
    }
}
