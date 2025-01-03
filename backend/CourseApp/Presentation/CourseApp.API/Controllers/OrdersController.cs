using CourseApp.Application.Features.Orders;
using CourseApp.Application.Features.Orders.Create;
using Microsoft.AspNetCore.Mvc;

namespace CourseApp.API.Controllers;

public class OrdersController(IOrderService orderService) : CustomBaseController
{
    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetOrdersByUserId(int userId) =>
     CreateActionResult(await orderService.GetAllByUserIdAsync(userId));

    [HttpPost]
    public async Task<IActionResult> Create(CreateOrderRequest request) => CreateActionResult(await orderService.CreateAsync(request));
}

