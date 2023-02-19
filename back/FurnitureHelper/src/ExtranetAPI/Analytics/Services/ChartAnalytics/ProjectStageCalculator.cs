using Domain.ProjectManagement;

namespace ExtranetAPI.Analytics.Services.ChartAnalytics;

public class ProjectStageCalculator: IProjectStageCalculator
{
    private readonly IProjectStageRepository _projectStageRepository;

    public ProjectStageCalculator(IProjectStageRepository projectStageRepository)
    {
        _projectStageRepository = projectStageRepository;
    }

    public async Task<decimal> CalculateStage( List<int> projectsIds, string stage )
    {
        List<ProjectStage> projectsStages = await _projectStageRepository.GetByProjectIds(projectsIds);

        return projectsStages.Where(x => x.ProjectStageCode == stage && x.IsCompleted).ToList().Count();
    }
}