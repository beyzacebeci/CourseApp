using CourseApp.Domain.Entities;
using CourseApp.Domain.Entities.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace CourseApp.Persistence.Courses;

public class CourseConfiguration : IEntityTypeConfiguration<Course>
{
    public void Configure(EntityTypeBuilder<Course> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Name).IsRequired().HasMaxLength(100);
        builder.Property(x => x.Description).IsRequired().HasMaxLength(200);
        builder.Property(x => x.Price).IsRequired().HasColumnType("decimal(16,2)");

        builder.HasOne(x => x.Category)
       .WithMany(c => c.Courses)
       .HasForeignKey(x => x.CategoryId)
       .OnDelete(DeleteBehavior.SetNull);

        builder.HasMany(c => c.Orders)
            .WithMany(o => o.Courses)
            .UsingEntity<Dictionary<string, object>>(
                "CourseOrder",
                j => j
                    .HasOne<Order>()
                    .WithMany()
                    .HasForeignKey("OrderId")
                    .OnDelete(DeleteBehavior.Cascade),
                j => j
                    .HasOne<Course>()
                    .WithMany()
                    .HasForeignKey("CourseId")
                    .OnDelete(DeleteBehavior.Cascade),
                j =>
                {
                    j.HasKey("CourseId", "OrderId");
                }
            );


        builder.HasData(CourseSeedData.GetInitialCourses()      
            );
         
           

     

    }
}

