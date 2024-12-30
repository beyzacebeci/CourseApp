using System.Linq.Expressions;


namespace CourseApp.Application.Contracts.Persistence;

public interface IGenericRepository<T, TId> where T : class where TId : struct
{
    public Task<bool> AnyAsync(TId id);
    Task<List<T>> GetAllAsync();
    Task<bool> AnyAsync(Expression<Func<T, bool>> predicate);

    Task<List<T>> GetAllPagedAsync(int pageNumber, int pageSize);

    IQueryable<T> Where(Expression<Func<T, bool>> predicate);

    ValueTask<T?> GetByIdAsync(int id);
    ValueTask AddAsync(T entity);
    void Update(T entity);
    void Delete(T entity);
}

