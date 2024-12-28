using CourseApp.Repositories.Courses;
using CourseApp.Repositories.Orders;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection;
using System.Reflection.Emit;


namespace CourseApp.Repositories;

public class CourseAppDbContext(DbContextOptions<CourseAppDbContext> options) : DbContext(options)
{
    DbSet<Course> Courses { get; set; } = default!;
    DbSet<Order> Orders { get; set; } = default!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        base.OnModelCreating(modelBuilder);
    }
}

