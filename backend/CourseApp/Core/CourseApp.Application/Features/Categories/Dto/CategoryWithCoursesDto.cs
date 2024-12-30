
using CourseApp.Application.Features.Courses.Dto;

namespace CourseApp.Application.Features.Categories.Dto;

public record CategoryWithCoursesDto(int Id, string Name, List<CourseDto> Courses);