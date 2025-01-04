using CourseApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace CourseApp.Persistence.Orders;

public class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(x => x.TotalPrice).IsRequired().HasColumnType("decimal(20,2)");

        builder.HasOne(o => o.User)
            .WithMany()
         .HasForeignKey(o => o.UserId)
             .OnDelete(DeleteBehavior.Restrict);  


        builder.HasOne(p => p.Payment)
            .WithOne(o => o.Order)  
            .HasForeignKey<Order>(p => p.PaymentId)
            .OnDelete(DeleteBehavior.Cascade);



    }
}

