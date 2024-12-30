using CourseApp.Domain.Entities.Base;

namespace CourseApp.Domain.Entities;

public class Category : BaseEntity<int>, IAuditEntity
{
    public string Name { get; set; } = default!;
    public List<Course>? Courses { get; set; }
    public DateTime CreatedTime { get; set; }
    public DateTime? UpdatedTime { get; set; }
}

