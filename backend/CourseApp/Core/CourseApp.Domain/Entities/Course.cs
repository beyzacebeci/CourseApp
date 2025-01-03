using CourseApp.Domain.Entities.Base;

namespace CourseApp.Domain.Entities;

public class Course : BaseEntity<int>, IAuditEntity
{
    public string Name { get; set; } = default!;
    public string Description { get; set; } = default!;
    public decimal Price { get; set; }
    public int? CategoryId { get; set; }
    public Category Category { get; set; } = default!;
    public DateTime CreatedTime { get; set; }
    public DateTime? UpdatedTime { get; set; }
    public List<Order>? Orders { get; set; }

}

