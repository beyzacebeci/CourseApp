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

    }
}
