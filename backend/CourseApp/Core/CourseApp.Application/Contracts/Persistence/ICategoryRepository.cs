using CourseApp.Domain.Entities;

namespace CourseApp.Application.Contracts.Persistence;

public interface ICategoryRepository : IGenericRepository<Category, int>
{
    Task<Category?> GetCategoryWithCoursesAsync(int id);
    Task<List<Category>> GetCategoryWithCoursesAsync();
}

