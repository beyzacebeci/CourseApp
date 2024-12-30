using CourseApp.Application.Contracts.Persistence;
using CourseApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CourseApp.Persistence.Categories;

public class CategoryRepository(CourseAppDbContext context) : GenericRepository<Category, int>(context), ICategoryRepository
{

    public Task<Category?> GetCategoryWithCoursesAsync(int id)
    {
        return context.Categories.Include(x => x.Courses)
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public IQueryable<Category> GetCategoryWithCourses()
    {
        return context.Categories.Include(x => x.Courses)
            .AsQueryable();
    }

    public Task<List<Category>> GetCategoryWithCoursesAsync()
    {
        return context.Categories.Include(x => x.Courses)
             .ToListAsync();
    }
}

