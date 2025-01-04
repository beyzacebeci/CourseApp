using CourseApp.Domain.Entities;

namespace CourseApp.Application.Contracts.Persistence;

public interface IOrderRepository : IGenericRepository<Order, int>
{
    Task<List<Order>> GetAllByUserIdAsync(int userId);
    Task<Order> CreateWithCoursesAsync(Order order, List<int> courseIds);

}

