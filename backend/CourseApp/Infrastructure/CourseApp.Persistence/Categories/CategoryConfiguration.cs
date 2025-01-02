using CourseApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CourseApp.Persistence.Categories;

public class CategoryConfiguration : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Name).IsRequired().HasMaxLength(150);

        builder.HasMany(c => c.Courses)
           .WithOne(c => c.Category)
           .OnDelete(DeleteBehavior.SetNull);


        builder.HasData(
            new Category { Id = 1, Name = ".Net" },
            new Category { Id = 2, Name = "Java" },
            new Category { Id = 3, Name = "React" },
            new Category { Id = 4, Name = "Python" },
            new Category { Id = 5, Name = "JavaScript" }
            );
    }
}

