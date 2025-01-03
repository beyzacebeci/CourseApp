using CourseApp.Domain.Entities.Base;
using CourseApp.Domain.Entities.Identity;

namespace CourseApp.Domain.Entities;

public class BasketItem : BaseEntity<int>, IAuditEntity
{
    public int UserId { get; set; }
    public int CourseId { get; set; }
    public decimal TotalPrice { get; set; }
    public DateTime CreatedTime { get; set; }
    public DateTime? UpdatedTime { get; set; }
    public Course Course { get; set; } = default!;
    public AppUser User { get; set; } = default!;

}

