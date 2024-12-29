namespace CourseApp.Repositories;

public interface IUnitOfWork
    {
        Task<int> SaveChangesAsync();

    }

