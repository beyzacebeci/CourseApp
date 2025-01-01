using CourseApp.Application.Contracts.Persistence;
using CourseApp.Domain.Entities.Identity;
using CourseApp.Domain.Options;
using CourseApp.Persistence;
using CourseApp.Persistence.Categories;
using CourseApp.Persistence.Courses;
using CourseApp.Persistence.Interceptors;
using CourseApp.Persistence.Orders;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;


namespace CourseApp.Persistence.Extensions;

public static class RepositoryExtensions
{
    public static IServiceCollection AddRepositories(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<CourseAppDbContext>(opt =>
        {
            var connectionStrings = configuration.GetSection(ConnectionStringOption.Key)
               .Get<ConnectionStringOption>();

            opt.UseSqlServer(connectionStrings!.SqlServer, sqlServerOptionsAction =>
            {
                sqlServerOptionsAction.MigrationsAssembly(typeof(PersistenceAssembly).Assembly.FullName);
            });

            opt.AddInterceptors(new AuditDbContextInterceptor());

        });

        
        services.AddIdentity<AppUser, AppRole>(
    opt => {
        opt.User.RequireUniqueEmail = false;
        opt.Password.RequireNonAlphanumeric = false;
    }
    ).AddEntityFrameworkStores<CourseAppDbContext>().AddDefaultTokenProviders();

       
        services.AddScoped<ICourseRepository, CourseRepository>();
        services.AddScoped<IOrderRepository, OrderRepository>();
        services.AddScoped<ICategoryRepository, CategoryRepository>();
        services.AddScoped(typeof(IGenericRepository<,>), typeof(GenericRepository<,>));

        services.AddScoped<IUnitOfWork, UnitOfWork>();
        return services;

    }
}

