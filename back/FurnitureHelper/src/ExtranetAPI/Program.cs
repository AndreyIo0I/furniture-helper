using Application.Services;
using Infrastructure;
using Infrastructure.Foundation.EntityFramwork;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using ExtranetAPI;
using ExtranetAPI.Analytics.Services;
using ExtranetAPI.Analytics.Services.Builders;
using ExtranetAPI.Analytics.Services.ChartAnalytics;
using ExtranetAPI.Services;
using ExtranetAPI.Services.Builders;
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder( args );

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie( CookieAuthenticationDefaults.AuthenticationScheme, options => {
        options.Events.OnRedirectToLogin = ctx =>
        {
            ctx.Response.StatusCode = StatusCodes.Status401Unauthorized;
            return Task.CompletedTask;
        };
        options.Events.OnRedirectToAccessDenied = ctx =>
        {
            ctx.Response.StatusCode = StatusCodes.Status403Forbidden;
            return Task.CompletedTask;
        };
    } );
builder.Services.AddAuthorization();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen( c =>
{
    c.EnableAnnotations();
    // Set the comments path for the Swagger JSON and UI.
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine( AppContext.BaseDirectory, xmlFile );
    c.IncludeXmlComments( xmlPath );
} );

var connectionString = builder.Configuration[ "ConnectionStrings:FurnitureHelper" ];
builder.Services
    .AddFoundations()
    .AddDbContext<FurnitureHelperDbContext>(
        opts => opts.UseNpgsql( connectionString )
    ).AddCors( options =>
    {
        options.AddDefaultPolicy(
            builder =>
            {
                builder
                    .WithOrigins( "*" )
                    .AllowAnyHeader();
            } );
    } );

builder.Services.AddExtranetApi(builder.Configuration["SecurityKey"]);
builder.Services.AddScoped<IProjectStageInitializer, ProjectStageInitializer>();
builder.Services.AddScoped<IClientConsistencyDeterminant, ClientConsistencyDeterminant>();
builder.Services.AddHealthChecks();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI( c => c.SwaggerEndpoint( "/swagger/v1/swagger.json", "FurnitureHelperv1" ) );

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapHealthChecks( "/health" );

app.Run();
