using CourseApp.Application.Contracts.Persistence;

namespace CourseApp.Application.Features.Orders;

public class OrderService(IOrderRepository orderRepository) : IOrderService
{
}

