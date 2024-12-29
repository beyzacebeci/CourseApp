using CourseApp.Repositories.Orders;

namespace CourseApp.Services.Orders;

public class OrderService(IOrderRepository orderRepository) : IOrderService
{
}

