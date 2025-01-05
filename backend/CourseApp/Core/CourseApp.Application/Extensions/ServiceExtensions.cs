using CourseApp.Application.Features.Authentication;
using CourseApp.Application.Features.BasketItems;
using CourseApp.Application.Features.Categories;
using CourseApp.Application.Features.Courses;
using CourseApp.Application.Features.Orders;
using CourseApp.Application.Features.Payments;
using CourseApp.Services.Categories;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace CourseApp.Application.Extensions;

public static class ServiceExtensions
{
    public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<ApiBehaviorOptions>(options => options.SuppressModelStateInvalidFilter = true);

        services.AddScoped<ICourseService, CourseService>();
        services.AddScoped<ICategoryService, CategoryService>();
        services.AddScoped<IOrderService,OrderService>();
        services.AddScoped<IPaymentService, PaymentService>();
        services.AddScoped<IBasketItemService, BasketItemService>();
        services.AddScoped<IAuthenticationService, AuthenticationService>();


        services.AddFluentValidationAutoValidation();

        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
        services.AddAutoMapper(Assembly.GetExecutingAssembly());


        return services;

    }
}

