namespace CourseApp.Repositories;

public class UnitOfWork(CourseAppDbContext context) : IUnitOfWork
    {
        public Task<int> SaveChangesAsync() => context.SaveChangesAsync();
        
    }

