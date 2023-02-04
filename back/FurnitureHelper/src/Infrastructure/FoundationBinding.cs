using Application.Foundation;
using Domain.ClientManagement;
using Domain.CostsManagement;
using Domain.ProjectManagement;
using Domain.UserManagement;
using Infrastructure.Foundation;
using Infrastructure.Foundation.EntityFramwork;
using Infrastructure.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure
{
    public static class FoundationsBinding
    {
        public static IServiceCollection AddFoundations( this IServiceCollection services )
        {
            services.AddScoped<IDbContext, FurnitureHelperDbContext>( services => services.GetRequiredService<FurnitureHelperDbContext>() );
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            services.AddRepositories();

            return services;
        }

        private static IServiceCollection AddRepositories( this IServiceCollection services )
        {
            services.AddScoped<IProjectRepository, ProjectRepository>();
            services.AddScoped<IClientRepository, ClientRepository>();
            services.AddScoped<ICostRepository, CostRepository>();
            services.AddScoped<IProjectBudgetRepository, ProjectBudgetRepository>();
            services.AddScoped<IProjectDeadlineSettingsRepository, ProjectDeadlineSettingsRepository>();
            services.AddScoped<IBuisnessCostRepository, BuisnessCostRepository>();
            services.AddScoped<IProjectStageRepository, ProjectStageRepository>();
            services.AddScoped<IUserRepository, UserRepository>();

            return services;
        }
    }
}
