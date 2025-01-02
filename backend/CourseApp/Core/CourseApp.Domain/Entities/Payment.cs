using CourseApp.Domain.Entities.Base;
using CourseApp.Domain.Entities.Identity;

namespace CourseApp.Domain.Entities;

public class Payment : BaseEntity<int>, IAuditEntity
{
    public int OrderId { get; set; }
    public int UserId { get; set; }
    public string Address { get; set; } = default!;
    public string CardNumber { get; set; } = default!;
    public DateTime ExpirationDate { get; set; } = default!;
    public string CVC { get; set; } = default!;
    public PaymentStatus Status { get; set; } = PaymentStatus.Pending;
    public AppUser User { get; set; } = default!;
    public Order Order { get; set; } = default!;
    public DateTime CreatedTime { get; set; }
    public DateTime? UpdatedTime { get; set; }
}
public enum PaymentStatus
{
    Pending,
    Success,
    Failed
}

