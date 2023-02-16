using ExtranetAPI.Analytics.Models.ProjectSummary;

namespace ExtranetAPI.Analytics.Services.Builders;

public interface IProjectSummaryBuilder
{
    Task<ProjectSummaryTableDto> Build(int projectId);
}