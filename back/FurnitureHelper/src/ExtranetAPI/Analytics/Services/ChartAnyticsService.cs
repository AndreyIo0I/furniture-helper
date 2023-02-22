using Domain.ProjectManagement;
using ExtranetAPI.Analytics.Extensions;
using ExtranetAPI.Analytics.Models.Chart;
using ExtranetAPI.Analytics.Services.ChartAnalytics;
using ExtranetAPI.Models;

namespace ExtranetAPI.Analytics.Services;

public class ChartAnyticsService: IChartAnyticsService
{
    private IReadOnlyList<Project> _projects;
    private IProjectsDataCollector _projectsDataCollector;

    private readonly IProjectRepository _projectRepository;

    public ChartAnyticsService( IProjectRepository projectRepository )
    {
        _projectRepository = projectRepository;
    }

    public async Task<List<ChartItemDto>> CreateChartAnalyticsByDate(
        IProjectsDataCollector projectsDataCollector,
        ChartPeriodType chartPeriodType,
        Period period )
    {
        _projects = await _projectRepository.GetByPeriod(period.StartDate, period.EndDate);
        _projectsDataCollector = projectsDataCollector;

        switch (chartPeriodType)
        {
            case ChartPeriodType.ByDays:
                return await ProjectsDataByDays( period );
            case ChartPeriodType.ByMonths:
                return await ProjectCostByMonths( period );
            case ChartPeriodType.ByYears:
                return await ProjectCostByYears( period );
            default:
                throw new ArgumentOutOfRangeException( "Invalid chart period type" );
        }
    }

    public async Task<List<ChartItemWeeksDto>> CreateChartAnalyticsByPeriod(
        IProjectsDataCollector projectsDataCollector,
        ChartPeriodType chartPeriodType,
        Period period)
    {
        _projects = await _projectRepository.GetByPeriod(period.StartDate, period.EndDate);
        _projectsDataCollector = projectsDataCollector;

        if (chartPeriodType != ChartPeriodType.ByWeeks)
        {
            throw new ArgumentOutOfRangeException("Chart period type must be weeks");
        }

        return await ProjectCostByWeeks(period);
    }

    private async Task<List<ChartItemDto>> ProjectsDataByDays( Period period )
    {
        Dictionary<DateTime, List<int>> projectsByDate =
            _projects.GroupBy(x => x.EndDate)
                .ToDictionary(x => x.Key.Value, x => x.Select(x => x.Id).ToList());

        Dictionary<DateTime, decimal> projectDataByDate = new Dictionary<DateTime, decimal>();
        
        foreach (var projectByDate in projectsByDate)
        {
            decimal value = await _projectsDataCollector.GetValueForProjects(projectByDate.Value);
            
            projectDataByDate.Add( projectByDate.Key, value );
        }

        return projectDataByDate.Select( x => new ChartItemDto
        {
            Date = x.Key,
            Value = x.Value
        } ).ToList();
    }
    
    private async Task<List<ChartItemWeeksDto>> ProjectCostByWeeks( Period period )
    {
        Dictionary<Period, List<int>> projectsByDate =
            _projects.GroupBy( x => x.EndDate.Value.Week())
                .ToDictionary(x => x.Key, x => x.Select(x => x.Id).ToList());

        Dictionary<Period, decimal> projectCostsByDate = new Dictionary<Period, decimal>();

        foreach (var projectByDate in projectsByDate)
        {
            decimal value = await _projectsDataCollector.GetValueForProjects(projectByDate.Value);
            
            projectCostsByDate.Add( projectByDate.Key, value );
        }

        return projectCostsByDate.Select( x => new ChartItemWeeksDto()
        {
            Period = x.Key,
            Value = x.Value
        } ).ToList();
    }
    
    private async Task<List<ChartItemDto>> ProjectCostByMonths( Period period )
    {
        Dictionary<DateTime, List<int>> projectsByDate =
            _projects.GroupBy(x => new
                {
                    Month = x.EndDate.Value.Month,
                    Year = x.EndDate.Value.Year
                })
                .ToDictionary(x =>
                        new DateTime(x.Key.Year, x.Key.Month, 1),
                    x => x.Select(x => x.Id).ToList() );

        Dictionary<DateTime, decimal> projectCostsByDate = new Dictionary<DateTime, decimal>();

        foreach (var projectByDate in projectsByDate)
        {
            decimal value = await _projectsDataCollector.GetValueForProjects(projectByDate.Value);
            
            projectCostsByDate.Add( projectByDate.Key, value );
        }

        return projectCostsByDate.Select( x => new ChartItemDto
        {
            Date = x.Key,
            Value = x.Value
        } ).ToList();
    }
    
    private async Task<List<ChartItemDto>> ProjectCostByYears( Period period )
    {
        Dictionary<int, List<int>> projectsByDate =
            _projects.GroupBy(x => new
                {
                    Year = x.EndDate.Value.Year
                })
                .ToDictionary(x =>
                        x.Key.Year,
                    x => x.Select(x => x.Id).ToList() );

        Dictionary<int, decimal> projectCostsByDate = new Dictionary<int, decimal>();

        foreach (var projectByDate in projectsByDate)
        {
            decimal value = await _projectsDataCollector.GetValueForProjects(projectByDate.Value);
            
            projectCostsByDate.Add( projectByDate.Key, value );
        }

        return projectCostsByDate.Select( x => new ChartItemDto
        {
            Date = new DateTime( x.Key, 1, 1 ),
            Value = x.Value
        } ).ToList();
    }
}