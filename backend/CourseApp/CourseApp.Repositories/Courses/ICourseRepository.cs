namespace CourseApp.Repositories.Courses;

public interface ICourseRepository : IGenericRepository<Course>
{
    public Task<List<Course>> GetTopPriceProductsAsync(int count);
}

