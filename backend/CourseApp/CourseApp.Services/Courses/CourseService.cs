using CourseApp.Repositories.Courses;

namespace CourseApp.Services.Courses;

public class CourseService(ICourseRepository courseRepository) : ICourseService
{ 
}

