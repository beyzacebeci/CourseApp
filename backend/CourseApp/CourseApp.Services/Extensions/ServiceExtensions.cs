using CourseApp.Services.Courses;
using CourseApp.Services.Orders;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CourseApp.Services.Extensions;

public static class ServiceExtensions
{
    public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration configuration)
    {

        services.AddScoped<ICourseService, CourseService>();
        services.AddScoped<IOrderService, OrderService>();
        return services;

    }
}

