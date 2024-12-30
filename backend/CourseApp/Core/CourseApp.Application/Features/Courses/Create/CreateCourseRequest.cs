namespace CourseApp.Application.Features.Courses.Create;

public record CreateCourseRequest(string Name,string Description, decimal Price, int CategoryId);

