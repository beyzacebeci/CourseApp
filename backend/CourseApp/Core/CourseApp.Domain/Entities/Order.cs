using CourseApp.Domain.Entities.Base;
using CourseApp.Domain.Entities.Identity;

namespace CourseApp.Domain.Entities;

public class Order : BaseEntity<int>, IAuditEntity
{
    public int UserId { get; set; }
    public decimal TotalPrice { get; set; }
    public OrderStatus Status { get; set; }
    public DateTime CreatedTime { get; set; }
    public DateTime? UpdatedTime { get; set; }
    public Payment? Payment { get; set; }  
    public AppUser User { get; set; } = default!;
    public List<Course>? Courses { get; set; }
}

public enum OrderStatus
{
    Pending,        // Sepette, henüz ödeme yapılmadı
    Processing,     // Ödeme işlemi devam ediyor
    Completed,      // Ödeme tamamlandı, kurs erişime açıldı
    Cancelled,      // İptal edildi
    Failed          // Ödeme başarısız oldu
}

