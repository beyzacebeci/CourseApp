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

        


        builder.HasData(          
            new Course { Id = 1, Name = ".Net Core Basics", Description = ".Net Core ile temel uygulamalar geliştirilecektir.", Price = 120, CategoryId = 1 },
            new Course { Id = 2, Name = "Java Temelleri", Description = "Java Temelleri hakkında bilgi verilecektir.", Price = 140, CategoryId = 2 },
            new Course { Id = 3, Name = "React için Giriş", Description = "React ile modern web uygulamaları nasıl yapılır?", Price = 100, CategoryId = 3 },
            new Course { Id = 4, Name = "Python Temelleri", Description = "Python dilinin temel kavramlarını öğreneceksiniz.", Price = 110, CategoryId = 4 },
            new Course { Id = 5, Name = "JavaScript ile Başlangıç", Description = "JavaScript dilinin temellerini öğrenin ve web programlamaya adım atın.", Price = 130, CategoryId = 5 },
            new Course { Id = 6, Name = ".Net Core Web API", Description = ".Net Core kullanarak RESTful API'ler geliştireceğiz.", Price = 150, CategoryId = 1 },
            new Course { Id = 7, Name = "React Native ile Mobil Uygulama Geliştirme", Description = "React Native ile iOS ve Android mobil uygulamaları geliştirin.", Price = 160, CategoryId = 3 }
                );

     

    }
}

