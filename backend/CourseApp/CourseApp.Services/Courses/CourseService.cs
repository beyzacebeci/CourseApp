using CourseApp.Repositories.Courses;
using System.Net;

namespace CourseApp.Services.Courses;

public class CourseService(ICourseRepository courseRepository) : ICourseService
{
    public async Task<ServiceResult< List<CourseDto>>> GetTopPriceProductsAsync(int count)
    {
        var courses = await courseRepository.GetTopPriceProductsAsync(count);
        
        var coursesDto =  courses.Select(c=> new CourseDto
        {
            Id = c.Id,
            Name = c.Name,
            Description = c.Description,
            Price = c.Price
        }).ToList();
        
        return new ServiceResult<List<CourseDto>>()
        {
            Data = coursesDto
        };
    }

    public async Task<ServiceResult<Course>> GetProductById(int id)
    {
        var course = await courseRepository.GetByIdAsync(id);
        if(course is null)
        {
            ServiceResult<Course>.Fail("Course not found",HttpStatusCode.NotFound);
        }

        return ServiceResult<Course>.Success(course!);
        
    }
}

