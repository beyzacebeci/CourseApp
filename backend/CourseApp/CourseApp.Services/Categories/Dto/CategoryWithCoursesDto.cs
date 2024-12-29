using CourseApp.Services.Courses;

namespace CourseApp.Services.Categories.Dto;

public record CategoryWithCoursesDto(int Id, string Name, List<CourseDto> Courses);