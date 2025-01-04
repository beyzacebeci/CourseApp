using CourseApp.Domain.Entities.Base;
using CourseApp.Domain.Entities.Identity;

namespace CourseApp.Domain.Entities;

public class Order : BaseEntity<int>, IAuditEntity
{
    public int UserId { get; set; }
    public int PaymentId { get; set; }
    public decimal TotalPrice { get; set; }
    public DateTime CreatedTime { get; set; }
    public DateTime? UpdatedTime { get; set; }
    public Payment Payment { get; set; } = default!;
    public AppUser User { get; set; } = default!;
    public List<Course>? Courses { get; set; }
}


