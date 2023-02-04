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
                ProjectStage.Default( 1, projectId, "Замер", "Measuring" ),
                ProjectStage.Default( 2, projectId, "Расчет", "Calculation" ),
                ProjectStage.Default( 3, projectId, "Договор", "Contract" ),
                ProjectStage.Default( 4, projectId, "Конструкторская документация", "DesignDocumentation" ),
                ProjectStage.Default( 5, projectId, "Распил", "Production" ),
                ProjectStage.Default( 6, projectId, "Фасады", "Production" ),
                ProjectStage.Default( 7, projectId, "Фурнитура", "Production" ),
                ProjectStage.Default( 8, projectId, "Мягкие детали", "Production" ),
                ProjectStage.Default( 9, projectId, "Стекло. Зеркало", "Production" ),
                ProjectStage.Default( 10, projectId, "Багет", "Production" ),
                ProjectStage.Default( 11, projectId, "Сборка", "Assembling" ),
                ProjectStage.Default( 12, projectId, "Установка", "Installation" ),
                ProjectStage.Default( 13, projectId, "Оплата", "Payment" ),
            };

            _repository.Add( toAdd );
        }
    }
}
