using CVEditor.Application.Mapping;
using CVEditor.Application.Services;
using CVEditor.Domain.Repositories;
using CVEditor.Domain.Services;
using CVEditor.Infrastructure.Data;
using CVEditor.Infrastructure.Repositories;
using FastEndpoints;
using FastEndpoints.Swagger;
using Microsoft.EntityFrameworkCore;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Configure Serilog
Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .WriteTo.File("logs/cvEditor-.log", rollingInterval: RollingInterval.Day)
    .CreateLogger();

builder.Host.UseSerilog();

// Add services to the container
builder.Services.AddDbContext<CvEditorDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register repositories
builder.Services.AddScoped<ICvProfileRepository, CvProfileRepository>();

// Register domain services
builder.Services.AddScoped<IProfileValidationService, ProfileValidationService>();

// Register application services
builder.Services.AddScoped<ICvProfileService, CvProfileService>();

// Add AutoMapper
builder.Services.AddAutoMapper(typeof(CvProfileMappingProfile));

// Add FastEndpoints
builder.Services.AddFastEndpoints()
                .SwaggerDocument(o =>
                {
                    o.DocumentSettings = s =>
                    {
                        s.Title = "CV Editor API";
                        s.Version = "v1";
                        s.Description = "API for managing CV profiles and templates";
                    };
                });

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000", "https://localhost:3000")
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseCors("AllowReactApp");

app.UseHttpsRedirection();

app.UseFastEndpoints(c =>
{
    c.Endpoints.RoutePrefix = "api";
})
.UseSwaggerGen();

// Ensure database is created
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<CvEditorDbContext>();
    await context.Database.EnsureCreatedAsync();
}

app.Run();

public partial class Program { } // For testing