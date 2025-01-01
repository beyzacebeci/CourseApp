using CourseApp.Domain.Entities;

namespace CourseApp.Application.Contracts.Persistence;

public interface ICourseRepository : IGenericRepository<Course,int>
{
    Task<int> CountAsync();

}

