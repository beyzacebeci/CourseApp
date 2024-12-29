using CourseApp.Repositories.Courses;

namespace CourseApp.Repositories.Categories;

public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Course>? Courses { get; set; }       

    }

