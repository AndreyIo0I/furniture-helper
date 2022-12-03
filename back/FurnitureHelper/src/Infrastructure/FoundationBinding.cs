﻿using Application.Foundation;
using Domain.ProjectManagement;
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

            return services;
        }
    }
}
