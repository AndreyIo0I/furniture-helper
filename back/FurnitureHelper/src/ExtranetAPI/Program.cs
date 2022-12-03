using Infrastructure;
using Infrastructure.Foundation.EntityFramwork;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder( args );

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


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

var app = builder.Build();

// Configure the HTTP request pipeline.
if ( app.Environment.IsDevelopment() )
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
