using Domain.ProjectManagement;
using ExtranetAPI.Analytics.Extensions;
using ExtranetAPI.Analytics.Models.Chart;
using ExtranetAPI.Analytics.Services.ChartAnalytics;
using ExtranetAPI.Models;

namespace ExtranetAPI.Analytics.Services;

public class ChartAnyticsService: IChartAnyticsService
{
    private IReadOnlyList<Tuple<Project, DateTime>> _projects;
    private IProjectsDataCollector _projectsDataCollector;
    
    private readonly IProjectsPayService _projectsPayService;

    public ChartAnyticsService(IProjectsPayService projectsPayService)
    {
        _projectsPayService = projectsPayService;
    }

    public async Task<List<ChartItemDto>> CreateChartAnalyticsByDate(
        IProjectsDataCollector projectsDataCollector,
        ChartPeriodType chartPeriodType,
        Period period )
    {
        _projectsDataCollector = projectsDataCollector;

        switch (chartPeriodType)
        {
            case ChartPeriodType.ByDays:
                if (period.StartDate.Day == period.EndDate.Day)
                {
                    DateTime date = period.StartDate;
                    period.StartDate = new DateTime(date.Year, date.Month, date.Day, 0, 0, 0);
                    period.EndDate = new DateTime(date.Year, date.Month, date.Day, 0, 0, 0).AddHours(23).AddMinutes(59);
                }
                _projects = await _projectsPayService.GetProjectWithPayByPeriod(period.StartDate, period.EndDate);
                return await ProjectsDataByDays( period );
            case ChartPeriodType.ByMonths:
                    DateTime startDate = period.StartDate;
                    DateTime endDate = period.EndDate;
                    period.StartDate = new DateTime(startDate.Year, startDate.Month, 1);
                    period.EndDate = new DateTime(endDate.Year, endDate.Month + 1, 1).AddDays(-1);
                    _projects = await _projectsPayService.GetProjectWithPayByPeriod(period.StartDate, period.EndDate);
                return await ProjectCostByMonths( period );
            case ChartPeriodType.ByYears:
                    int startDateYear = period.StartDate.Year;
                    int endDateYear = period.EndDate.Year;
                    period.StartDate = new DateTime(startDateYear, 1, 1);
                    period.EndDate = new DateTime(endDateYear, 12, 31);
                _projects = await _projectsPayService.GetProjectWithPayByPeriod(period.StartDate, period.EndDate);
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
        _projects = await _projectsPayService.GetProjectWithPayByPeriod(period.StartDate.Week().StartDate, period.EndDate.Week().EndDate);
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
            _projects.GroupBy(x => x.Item2.Date)
                .ToDictionary(x => x.Key, x => x.Select(x => x.Item1.Id).ToList());

        Dictionary<DateTime, decimal> projectDataByDate = new Dictionary<DateTime, decimal>();
        
        foreach (var projectByDate in projectsByDate)
        {
            decimal value = await _projectsDataCollector.GetValueForProjects(projectByDate.Value, new Period(projectByDate.Key, projectByDate.Key.AddDays(1)));
            
            projectDataByDate.Add( projectByDate.Key, value );
        }

        return projectDataByDate.Select( x => new ChartItemDto
        {
            Date = x.Key.ToUniversalTime(),
            Value = x.Value
        } ).ToList();
    }
    
    private async Task<List<ChartItemWeeksDto>> ProjectCostByWeeks( Period period )
    {
        Dictionary<Period, List<int>> projectsByDate =
            _projects.GroupBy( x => x.Item2.Date.Week())
                .ToDictionary(x => x.Key, x => x.Select(x => x.Item1.Id).ToList());

        Dictionary<Period, decimal> projectCostsByDate = new Dictionary<Period, decimal>();

        foreach (var projectByDate in projectsByDate)
        {
            decimal value = await _projectsDataCollector.GetValueForProjects(projectByDate.Value, projectByDate.Key);
            
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
                    Month = x.Item2.Month,
                    Year = x.Item2.Year
                })
                .ToDictionary(x =>
                        new DateTime(x.Key.Year, x.Key.Month, 1),
                    x => x.Select(x => x.Item1.Id).ToList() );

        Dictionary<DateTime, decimal> projectCostsByDate = new Dictionary<DateTime, decimal>();

        foreach (var projectByDate in projectsByDate)
        {
            decimal value = await _projectsDataCollector.GetValueForProjects(
                projectByDate.Value,
                new Period(
                    projectByDate.Key,
                    projectByDate.Key.AddMonths(1)));
            
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
                    Year = x.Item2.Year
                })
                .ToDictionary(x =>
                        x.Key.Year,
                    x => x.Select(x => x.Item1.Id).ToList() );

        Dictionary<int, decimal> projectCostsByDate = new Dictionary<int, decimal>();

        foreach (var projectByDate in projectsByDate)
        {
            decimal value = await _projectsDataCollector.GetValueForProjects(
                projectByDate.Value,
                new Period(
                    new DateTime(projectByDate.Key, 1, 1),
                    new DateTime(projectByDate.Key + 1, 1, 1)));
            
            projectCostsByDate.Add( projectByDate.Key, value );
        }

        return projectCostsByDate.Select( x => new ChartItemDto
        {
            Date = new DateTime( x.Key, 1, 1 ),
            Value = x.Value
        } ).ToList();
    }
}