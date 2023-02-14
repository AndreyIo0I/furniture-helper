using ExtranetAPI.Analytics.Models.Chart;

namespace ExtranetAPI.Analytics.Services.ChartAnalytics;

public class ProjectDataCollectorFactory: IProjectDataCollectorFactory
{
    private readonly IServiceProvider _serviceProvider;

    public ProjectDataCollectorFactory(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }
    
    public IProjectsDataCollector GetProjectDataCollector(ChartType chartType)
    {
        switch (chartType)
        {
            case ChartType.Revenue:
                return (IProjectsDataCollector)_serviceProvider.GetService(typeof(ProjectsRevenueCollector));
            case ChartType.Cost:
                return (IProjectsDataCollector)_serviceProvider.GetService(typeof(ProjectsCostsCollector));
            case ChartType.Margin:
                return (IProjectsDataCollector)_serviceProvider.GetService(typeof(ProjectMarginCollector));
            case ChartType.K1:
                return (IProjectsDataCollector)_serviceProvider.GetService(typeof(ProjectsKOneCollector));
            case ChartType.K2:
                return (IProjectsDataCollector)_serviceProvider.GetService(typeof(ProjectsKTwoCollector));
            default:
                throw new ArgumentOutOfRangeException("Invalid chart type");
        }
    }
}