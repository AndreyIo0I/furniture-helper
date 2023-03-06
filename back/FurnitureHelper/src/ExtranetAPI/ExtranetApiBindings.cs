using ExtranetAPI.Analytics.Services;
using ExtranetAPI.Analytics.Services.Builders;
using ExtranetAPI.Analytics.Services.ChartAnalytics;
using ExtranetAPI.Services;
using ExtranetAPI.Services.Builders;

namespace ExtranetAPI;

public static class ExtranetApiBindings
{
    public static IServiceCollection AddExtranetApi( this IServiceCollection serviceCollection, string securityKey )
    {
        return serviceCollection
            .AddScoped<IAuthentificationService, AuthentificationService>()
            .AddScoped<IAnalyticsService, AnalyticsService>()
            .AddScoped<IUserBuilder, UserBuilder>()
            .AddScoped<IProjectStageCalculator, ProjectStageCalculator>()
            .AddScoped<IPasswordCryptionService, PasswordCryptionService>(
                sp => new PasswordCryptionService(securityKey))
            .AddScoped<IProjectSummaryBuilder, ProjectSummaryBuilder>()
            .AddScoped<IProjectNumericalIndicatorsBuilder, ProjectNumericalIndicatorsBuilder>()
            .AddScoped<IChartAnyticsService, ChartAnyticsService>()
            .AddScoped<IProjectsPayService, ProjectsPayService>()
            .AddScoped<IChartAnalyticsBuilder, ChartAnalyticsBuilder>()
            .AddScoped<IProjectDataCollectorFactory, ProjectDataCollectorFactory>()
            .AddScoped<ProjectsRevenueCollector>()
            .AddScoped<IProjectsDataCollector, ProjectsRevenueCollector>(s =>
                s.GetService<ProjectsRevenueCollector>())
            .AddScoped<ProjectsCostsCollector>()
            .AddScoped<IProjectsDataCollector, ProjectsCostsCollector>(s =>
                s.GetService<ProjectsCostsCollector>())
            .AddScoped<ProjectMarginCollector>()
            .AddScoped<IProjectsDataCollector, ProjectMarginCollector>(s =>
                s.GetService<ProjectMarginCollector>())
            .AddScoped<ProjectsKOneCollector>()
            .AddScoped<IProjectsDataCollector, ProjectsKOneCollector>(s =>
                s.GetService<ProjectsKOneCollector>())
            .AddScoped<ProjectsKTwoCollector>()
            .AddScoped<IProjectsDataCollector, ProjectsKTwoCollector>(s =>
                s.GetService<ProjectsKTwoCollector>())
            .AddScoped<ProjectAssemblyCollector>()
            .AddScoped<IProjectsDataCollector, ProjectAssemblyCollector>(s =>
                s.GetService<ProjectAssemblyCollector>())
            .AddScoped<ProjectCalculationCollector>()
            .AddScoped<IProjectsDataCollector, ProjectCalculationCollector>(s =>
                s.GetService<ProjectCalculationCollector>())
            .AddScoped<ProjectContractCollector>()
            .AddScoped<IProjectsDataCollector, ProjectContractCollector>(s =>
                s.GetService<ProjectContractCollector>())
            .AddScoped<ProjectInstallationCollector>()
            .AddScoped<IProjectsDataCollector, ProjectInstallationCollector>(s =>
                s.GetService<ProjectInstallationCollector>())
            .AddScoped<ProjectPaymentCollector>()
            .AddScoped<IProjectsDataCollector, ProjectPaymentCollector>(s =>
                s.GetService<ProjectPaymentCollector>())
            .AddScoped<ProjectProfitCollector>()
            .AddScoped<IProjectsDataCollector, ProjectProfitCollector>(s =>
                s.GetService<ProjectProfitCollector>());

    }
}