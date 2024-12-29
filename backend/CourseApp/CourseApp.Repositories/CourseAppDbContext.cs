using CourseApp.Repositories.Categories;
using CourseApp.Repositories.Courses;
using CourseApp.Repositories.Orders;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection;
using System.Reflection.Emit;


namespace CourseApp.Repositories;

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

