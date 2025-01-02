using CourseApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Reflection.Emit;

namespace CourseApp.Persistence.Payments;

public class PaymentConfiguration : IEntityTypeConfiguration<Payment>
{
    public void Configure(EntityTypeBuilder<Payment> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Address).IsRequired().HasMaxLength(200);
        builder.Property(x => x.CardNumber).IsRequired().HasMaxLength(16);
        builder.Property(x => x.CVC).IsRequired().HasMaxLength(3);
        builder.Property(x => x.ExpirationDate).IsRequired();

        builder.Property(x => x.Status)
            .IsRequired()
        .HasConversion<string>();


        builder.HasOne(p => p.Order)
        .WithMany()  // "Order" does not need to reference "Payment" in this case
        .HasForeignKey(p => p.OrderId)
        .OnDelete(DeleteBehavior.Restrict);


    }
}

