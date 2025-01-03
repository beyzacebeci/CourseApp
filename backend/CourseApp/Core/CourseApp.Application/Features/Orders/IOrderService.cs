using CourseApp.Application.Features.BasketItems.Dto;
using CourseApp.Application.Features.Orders.Create;
using CourseApp.Application.Features.Orders.Dto;

namespace CourseApp.Application.Features.Orders;

public interface IOrderService
{
    Task<ServiceResult<List<OrderDto>>> GetAllByUserIdAsync(int userId);

    Task<ServiceResult<int>> CreateAsync(CreateOrderRequest request);

}

