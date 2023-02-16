﻿using ExtranetAPI.Analytics.Services;
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
            .AddScoped<IPasswordCryptionService, PasswordCryptionService>(
                sp => new PasswordCryptionService(securityKey))
            .AddScoped<IProjectSummaryBuilder, ProjectSummaryBuilder>()
            .AddScoped<IProjectNumericalIndicatorsBuilder, ProjectNumericalIndicatorsBuilder>()
            .AddScoped<IChartAnyticsService, ChartAnyticsService>()
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
                s.GetService<ProjectsKTwoCollector>());
    }
}