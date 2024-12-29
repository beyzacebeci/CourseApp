using CourseApp.Repositories.Categories;

namespace CourseApp.Repositories.Courses;

public class Course : IAuditEntity
{
    public int Id { get; set; }
    public string Name { get; set; } = default!;
    public string Description { get; set; } = default!;
    public decimal Price { get; set; }

    public int CategoryId { get; set; }
    public Category Category { get; set; } = default!;
    public DateTime CreatedTime { get; set ; }
    public DateTime? UpdatedTime { get; set; }
}

