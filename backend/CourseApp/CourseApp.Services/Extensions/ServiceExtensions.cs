using CourseApp.Services.Categories;
using CourseApp.Services.Courses;
using CourseApp.Services.ExeptionHandlers;
using CourseApp.Services.Filters;
using CourseApp.Services.Orders;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using System.Reflection;

namespace CourseApp.Services.Extensions;

public static class ServiceExtensions
{
    public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<ApiBehaviorOptions>(options => options.SuppressModelStateInvalidFilter = true);

        services.AddScoped<ICourseService, CourseService>();
        services.AddScoped<ICategoryService,CategoryService>();
        services.AddScoped<IOrderService, OrderService>();

        services.AddScoped(typeof(NotFoundFilter<,>));

        services.AddFluentValidationAutoValidation();

        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
        services.AddAutoMapper(Assembly.GetExecutingAssembly());

        services.AddExceptionHandler<GlobalExceptionHandler>();
        
        return services;

    }
}

