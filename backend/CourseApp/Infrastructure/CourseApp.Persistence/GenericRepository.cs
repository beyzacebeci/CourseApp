using CourseApp.Application.Contracts.Persistence;
using CourseApp.Domain.Entities.Base;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace CourseApp.Persistence;

public class GenericRepository<T, TId>(CourseAppDbContext context)
        : IGenericRepository<T, TId> where T : BaseEntity<TId> where TId : struct
{
    protected CourseAppDbContext Context = context;

    private readonly DbSet<T> _dbSet = context.Set<T>();
    public Task<List<T>> GetAllAsync()
    {
        return _dbSet.ToListAsync();
    }

    public IQueryable<T> GetAll() => _dbSet.AsQueryable().AsNoTracking();
    
    public Task<List<T>> GetAllPagedAsync(int pageNumber, int pageSize)
    {
        return _dbSet.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
    }
   
    public Task<bool> AnyAsync(TId id) => _dbSet.AnyAsync(x => x.Id.Equals(id));
    
    public Task<bool> AnyAsync(Expression<Func<T, bool>> predicate)
    {
        return _dbSet.AnyAsync(predicate);
    }

    public IQueryable<T> Where(Expression<Func<T, bool>> predicate) => _dbSet.Where(predicate).AsNoTracking();
    
    public ValueTask<T?> GetByIdAsync(int id) => _dbSet.FindAsync(id);
   
    public async ValueTask AddAsync(T entity) => await _dbSet.AddAsync(entity);
   
    public void Update(T entity) => _dbSet.Update(entity);
   
    public void Delete(T entity) => _dbSet.Remove(entity);


}

