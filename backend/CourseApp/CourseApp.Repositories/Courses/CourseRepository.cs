using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseApp.Repositories.Courses
{
    public class CourseRepository(CourseAppDbContext context) : GenericRepository<Course>(context), ICourseRepository
    {
        public Task<List<Course>> GetTopPriceProductsAsync(int count)
        {
            return Context.Courses.OrderByDescending(x=>x.Price).Take(count).ToListAsync();

        }
    }
}
