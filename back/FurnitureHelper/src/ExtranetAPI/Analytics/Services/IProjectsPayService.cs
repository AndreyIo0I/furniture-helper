using Domain.ProjectManagement;

namespace ExtranetAPI.Analytics.Services;

public interface IProjectsPayService
{
    Task<List<Tuple<Project, DateTime>>> GetProjectWithPayByPeriod(DateTime startDate, DateTime endDate);
}