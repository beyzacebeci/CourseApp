using CourseApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection;


namespace CourseApp.Persistence;

public class CourseAppDbContext(DbContextOptions<CourseAppDbContext> options) : DbContext(options)
{
    public DbSet<Course> Courses { get; set; } = default!;
    public DbSet<Category> Categories { get; set; } = default!;
    public DbSet<Order> Orders { get; set; } = default!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        base.OnModelCreating(modelBuilder);
    }
}

