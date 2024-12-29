namespace CourseApp.Repositories.Categories;

public interface ICategoryRepository : IGenericRepository<Category,int>
    {
    Task<Category?> GetCategoryWithCoursesAsync(int id);
    IQueryable<Category?> GetCategoryWithCourses();
    }

