using Domain.ProjectManagement;

namespace Application.Services
{
    public interface IProjectStageInitializer
    {
        Task Init( int projectId );
    }

    public class ProjectStageInitializer : IProjectStageInitializer
    {
        private readonly IProjectStageRepository _repository;

        public ProjectStageInitializer( IProjectStageRepository repository )
        {
            _repository = repository;
        }

        public async Task Init( int projectId )
        {
            var toAdd = new List<ProjectStage>
            {
                ProjectStage.Default( projectId, "Замер" ),
                ProjectStage.Default( projectId, "Дизайн" ),
                ProjectStage.Default( projectId, "Договор" ),
                ProjectStage.Default( projectId, "Контрольный замер" ),
                ProjectStage.Default( projectId, "Деталировка" ),
                ProjectStage.Default( projectId, "Схемы" ),
                ProjectStage.Default( projectId, "Распил" ),
                ProjectStage.Default( projectId, "Фасады" ),
                ProjectStage.Default( projectId, "Фурнитура" ),
                ProjectStage.Default( projectId, "Мягкие детали" ),
                ProjectStage.Default( projectId, "Стекло. Зеркало" ),
                ProjectStage.Default( projectId, "Багет" ),
                ProjectStage.Default( projectId, "Сборка" ),
                ProjectStage.Default( projectId, "Установка" ),
            };

            _repository.Add( toAdd );
        }
    }
}
