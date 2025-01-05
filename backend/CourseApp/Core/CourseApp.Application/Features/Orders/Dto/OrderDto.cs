using CourseApp.Application.Features.Courses.Dto;


namespace CourseApp.Application.Features.Orders.Dto;

    public record OrderDto(int Id, int UserId, decimal TotalPrice, DateTime CreatedTime,
    List<CourseDto> Courses);

