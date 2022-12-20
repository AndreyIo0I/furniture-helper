using Infrastructure;
using Infrastructure.Foundation.EntityFramwork;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

var builder = WebApplication.CreateBuilder( args );

// Add services to the container.

builder.Services.AddControllers();
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

builder.Services.AddHealthChecks();

var app = builder.Build();

// Configure the HTTP request pipeline.
if ( app.Environment.IsDevelopment() )
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseAuthorization();

app.MapControllers();

app.MapHealthChecks( "/health" );

app.Run();
