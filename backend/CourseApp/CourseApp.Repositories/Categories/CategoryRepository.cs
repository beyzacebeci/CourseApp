
using Microsoft.EntityFrameworkCore;

namespace CourseApp.Repositories.Categories;

public class CategoryRepository(CourseAppDbContext context) : GenericRepository<Category,int>(context), ICategoryRepository
{

    public Task<Category?> GetCategoryWithCoursesAsync(int id)
    {
        return context.Categories.Include(x=>x.Courses)
            .FirstOrDefaultAsync(x=>x.Id == id);
    }

    public IQueryable<Category> GetCategoryWithCourses()
    {
        return context.Categories.Include(x => x.Courses)
            .AsQueryable();
    }
}

