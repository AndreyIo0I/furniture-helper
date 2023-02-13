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
            default:
                throw new ArgumentOutOfRangeException("Invalid chart type");
        }
    }
}