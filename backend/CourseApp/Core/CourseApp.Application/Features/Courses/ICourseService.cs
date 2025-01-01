using CourseApp.Application.Features.Courses.Create;
using CourseApp.Application.Features.Courses.Dto;
using CourseApp.Application.Features.Courses.Update;
using CourseApp.Application.Features.Courses.UpdatePrice;


namespace CourseApp.Application.Features.Courses;

public interface ICourseService
{
    Task<ServiceResult<List<CourseDto>>> GetAllListAsync();
    Task<ServiceResult<List<CourseDto>>> GetPagedAllListAsync(int pageNumber, int pageSize);
    Task<ServiceResult<int>> GetTotalCourseCountAsync();
    Task<ServiceResult<CourseDto?>> GetByIdAsync(int id);
    Task<ServiceResult<CreateCourseResponse>> CreateAsync(CreateCourseRequest request);
    Task<ServiceResult> UpdateAsync(int id, UpdateCourseRequest request);
    Task<ServiceResult> UpdatePriceAsync(UpdateCoursePriceRequest request);

    Task<ServiceResult> DeleteAsync(int id);



}
