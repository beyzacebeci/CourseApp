namespace CourseApp.Application.Features.Courses.Update;

public record UpdateCourseRequest(string Name, string Description, decimal Price, int CategoryId);

