using CourseApp.Domain.Entities;

namespace CourseApp.Application.Contracts.Persistence;

public interface IOrderRepository : IGenericRepository<Order, int>
{
}

