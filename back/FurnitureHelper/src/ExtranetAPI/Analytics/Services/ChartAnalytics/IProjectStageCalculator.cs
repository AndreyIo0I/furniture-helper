namespace ExtranetAPI.Analytics.Services.ChartAnalytics;

public interface IProjectStageCalculator
{
    Task<decimal> CalculateStage(List<int> projectsIds, string stage);
}