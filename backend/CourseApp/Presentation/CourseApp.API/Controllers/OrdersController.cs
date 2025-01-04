using CourseApp.Application.Features.Orders.Create;
using CourseApp.Application.Features.Orders;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CourseApp.API.Controllers;

[Authorize]
public class OrdersController : CustomBaseController
{
    private readonly IOrderService _orderService;

    public OrdersController(IOrderService orderService)
    {
        _orderService = orderService;
    }

    private int GetCurrentUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        return int.Parse(userIdClaim?.Value ?? "0");
    }

    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetOrdersByUserId(int userId)
    {
        // Token'dan gelen userId ile parametre olarak gelen userId'yi karşılaştır
        if (userId != GetCurrentUserId())
        {
            return Forbid();
        }

        return CreateActionResult(await _orderService.GetAllByUserIdAsync(userId));
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateOrderRequest request)
    {
        // Token'dan gelen userId ile request'teki userId'yi karşılaştır
        if (request.UserId != GetCurrentUserId())
        {
            return Forbid();
        }

        return CreateActionResult(await _orderService.CreateAsync(request));
    }
}