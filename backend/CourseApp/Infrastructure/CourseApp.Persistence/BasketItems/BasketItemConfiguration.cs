using CourseApp.Domain.Entities;
using CourseApp.Domain.Entities.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CourseApp.Persistence.BasketItems;

public class BasketItemConfiguration : IEntityTypeConfiguration<BasketItem>
{
    public void Configure(EntityTypeBuilder<BasketItem> builder)
    {
        // Primary key tanımlama
        builder.HasKey(x => x.Id);

        builder.HasOne(x=>x.User)
            .WithMany(u => u.BasketItems)
            .HasForeignKey(b => b.UserId)
            .OnDelete(DeleteBehavior.Cascade);


    }
}
