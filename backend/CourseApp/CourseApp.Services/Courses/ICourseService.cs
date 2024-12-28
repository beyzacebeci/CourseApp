using CourseApp.Services.Courses.Create;
using CourseApp.Services.Courses.Update;
using CourseApp.Services.Courses.UpdatePrice;

namespace CourseApp.Services.Courses;

public interface ICourseService
    {
        Task<ServiceResult<List<CourseDto>>> GetAllListAsync();
        Task<ServiceResult<List<CourseDto>>> GetPagedAllListAsync(int pageNumber, int pageSize);
        Task<ServiceResult<CourseDto?>> GetByIdAsync(int id);
        Task<ServiceResult<CreateCourseResponse>> CreateAsync(CreateCourseRequest request);
        Task<ServiceResult> UpdateAsync(int id, UpdateCourseRequest request);
        Task<ServiceResult> UpdatePriceAsync(UpdateCoursePriceRequest request);

        Task<ServiceResult> DeleteAsync(int id);


    
}
