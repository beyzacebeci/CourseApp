using CourseApp.Application.Contracts.Persistence;

namespace CourseApp.Persistence;

public class UnitOfWork(CourseAppDbContext context) : IUnitOfWork
{
    public Task<int> SaveChangesAsync() => context.SaveChangesAsync();

}

