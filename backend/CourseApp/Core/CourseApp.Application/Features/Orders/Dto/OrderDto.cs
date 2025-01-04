using CourseApp.Application.Features.Courses.Dto;
using CourseApp.Domain.Entities;

namespace CourseApp.Application.Features.Orders.Dto
{
    public record OrderDto(int Id, int UserId, decimal TotalPrice, 
        List<CourseDto> Courses);
}
