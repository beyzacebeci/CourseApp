namespace CourseApp.Services.Courses.Update;

public record UpdateCourseRequest(string Name, string Description,decimal Price, int CategoryId);

