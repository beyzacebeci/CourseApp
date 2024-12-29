using CourseApp.Repositories.Categories;
using CourseApp.Repositories.Courses;
using CourseApp.Repositories.Interceptors;
using CourseApp.Repositories.Orders;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;


namespace CourseApp.Repositories.Extensions;

public static class RepositoryExtensions
{
    public static IServiceCollection AddRepositories(this IServiceCollection services,IConfiguration configuration)
    {
        services.AddDbContext<CourseAppDbContext>(opt =>
        {
            var connectionStrings = configuration.GetSection(ConnectionStringOption.Key)
               .Get<ConnectionStringOption>();

            opt.UseSqlServer(connectionStrings!.SqlServer, sqlServerOptionsAction =>
            {
                sqlServerOptionsAction.MigrationsAssembly(typeof(RepositoryAssembly).Assembly.FullName);
            });

            opt.AddInterceptors(new AuditDbContextInterceptor());

        });
        
        services.AddScoped<ICourseRepository, CourseRepository>();
        services.AddScoped<IOrderRepository, OrderRepository>();
        services.AddScoped<ICategoryRepository, CategoryRepository>();
        services.AddScoped(typeof(IGenericRepository<,>), typeof(GenericRepository<,>));

        services.AddScoped<IUnitOfWork,UnitOfWork>();
        return services;

    }
}

