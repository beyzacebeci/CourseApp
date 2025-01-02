using CourseApp.Application.Contracts.Persistence;
using CourseApp.Domain.Entities;
using CourseApp.Persistence;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseApp.Persistence.Courses
{
    public class CourseRepository(CourseAppDbContext context) : GenericRepository<Course, int>(context), ICourseRepository
    {
        public async Task<int> CountAsync()
        {
            return await context.Courses.CountAsync();
        }
        public async Task<int> CountByCategoryIdAsync(int categoryId)
        {
            return await context.Courses.CountAsync(x => x.CategoryId == categoryId);

        }

        public async Task<List<Course>> GetAllPagedByCategoryIdsAsync(int pageNumber, int pageSize, List<int> categoryIds)
        {
            return await context.Courses
                .Where(course => categoryIds.Contains(course.CategoryId))
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }


    }
}
