using CourseApp.Domain.Entities;
using CourseApp.Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using System.Reflection;


namespace CourseApp.Persistence;

public class CourseAppDbContext(DbContextOptions<CourseAppDbContext> options) : IdentityDbContext<AppUser, AppRole, int>(options)
{
    public DbSet<Course> Courses { get; set; } = default!;
    public DbSet<Category> Categories { get; set; } = default!;
    public DbSet<Order> Orders { get; set; } = default!;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);

        // Warning'i bastır
        optionsBuilder.ConfigureWarnings(warnings =>
            warnings.Ignore(RelationalEventId.PendingModelChangesWarning));
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

    }
}

