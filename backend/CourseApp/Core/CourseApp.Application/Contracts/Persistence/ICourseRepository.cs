using CourseApp.Domain.Entities;

namespace CourseApp.Application.Contracts.Persistence;

public interface ICourseRepository : IGenericRepository<Course,int>
{
    Task<int> CountAsync();
    Task<int> CountByCategoryIdAsync(int categoryId);
    Task<List<Course>> GetAllPagedByCategoryIdsAsync(int pageNumber, int pageSize, List<int> categoryIds);


}

