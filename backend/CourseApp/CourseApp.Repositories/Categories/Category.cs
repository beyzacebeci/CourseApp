using CourseApp.Repositories.Courses;

namespace CourseApp.Repositories.Categories;

public class Category : IAuditEntity
{
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Course>? Courses { get; set; }
    public DateTime CreatedTime { get; set; }
    public DateTime? UpdatedTime { get; set; }
}

