using CourseApp.Domain.Entities;
using CourseApp.Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection;


namespace CourseApp.Persistence;

public class CourseAppDbContext(DbContextOptions<CourseAppDbContext> options) : IdentityDbContext<AppUser, AppRole, int>(options)
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

