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
            case ChartType.Assembly:
                return (IProjectsDataCollector)_serviceProvider.GetService(typeof(ProjectAssemblyCollector));
            case ChartType.Calculation:
                return (IProjectsDataCollector)_serviceProvider.GetService(typeof(ProjectCalculationCollector));
            case ChartType.Contract: 
                return (IProjectsDataCollector)_serviceProvider.GetService(typeof(ProjectContractCollector));
            case ChartType.Installation:
                return (IProjectsDataCollector)_serviceProvider.GetService(typeof(ProjectInstallationCollector));
            case ChartType.Payment:
                return (IProjectsDataCollector)_serviceProvider.GetService(typeof(ProjectPaymentCollector));
            case ChartType.Profit:
                return (IProjectsDataCollector)_serviceProvider.GetService(typeof(ProjectProfitCollector));
            default:
                throw new ArgumentOutOfRangeException("Invalid chart type");
        }
    }
}