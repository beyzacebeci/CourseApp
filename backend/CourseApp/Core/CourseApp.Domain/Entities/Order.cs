using CourseApp.Domain.Entities.Base;
using CourseApp.Domain.Entities.Identity;

namespace CourseApp.Domain.Entities;

public class Order : BaseEntity<int> , IAuditEntity
{
    public int UserId { get; set; }
    public decimal TotalPrice { get; set; }
    public DateTime CreatedTime { get; set; }
    public DateTime? UpdatedTime { get; set; }
    public AppUser User { get; set; }
    public List<Course>? Courses { get; set; }
}

