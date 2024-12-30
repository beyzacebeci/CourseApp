using CourseApp.Application.Contracts.Persistence;
using CourseApp.Domain.Entities;

namespace CourseApp.Persistence.Orders;

public class OrderRepository(CourseAppDbContext context) : GenericRepository<Order, int>(context), IOrderRepository
{
}

