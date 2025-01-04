using CourseApp.API.Filters;
using CourseApp.Application.Features.BasketItems;
using CourseApp.Application.Features.BasketItems.Create;
using CourseApp.Application.Features.Baskets;
using CourseApp.Application.Features.Categories;
using CourseApp.Application.Features.Categories.Create;
using CourseApp.Domain.Entities;
using CourseApp.Services.Categories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CourseApp.API.Controllers
{
    [Authorize] 
    public class BasketItemsController : CustomBaseController
    {
        private readonly IBasketItemService _basketService;

        public BasketItemsController(IBasketItemService basketService)
        {
            _basketService = basketService;
        }

        private int GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            return int.Parse(userIdClaim?.Value ?? "0");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBasket(int id)
        {
            var basket = await _basketService.GetByIdAsync(id);

            // Kullanıcı sadece kendi sepet öğelerini görebilir
            if (basket.IsSuccess && basket.Data.UserId != GetCurrentUserId())
            {
                return Forbid();
            }

            return CreateActionResult(basket);
        }

        [HttpPost]
        public async Task<IActionResult> CreateBasket(CreateBasketItemRequest request)
        {
            // Kullanıcı sadece kendi adına sepete ürün ekleyebilir
            if (request.UserId != GetCurrentUserId())
            {
                return Forbid();
            }

            return CreateActionResult(await _basketService.CreateAsync(request));
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetBasketsByUserId(int userId)
        {
            // Kullanıcı sadece kendi sepet öğelerini listeleyebilir
            if (userId != GetCurrentUserId())
            {
                return Forbid();
            }

            return CreateActionResult(await _basketService.GetAllByUserIdAsync(userId));
        }

        [ServiceFilter(typeof(NotFoundFilter<Category, int>))]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBasketItem(int id)
        {
            // Silmeden önce sepet öğesinin kullanıcıya ait olduğunu kontrol et
            var basket = await _basketService.GetByIdAsync(id);
            if (basket.IsSuccess && basket.Data.UserId != GetCurrentUserId())
            {
                return Forbid();
            }

            return CreateActionResult(await _basketService.DeleteAsync(id));
        }

        [HttpDelete("delete-all")]
        public async Task<IActionResult> DeleteAllBasketItems()
        {
            var userBaskets = await _basketService.GetAllByUserIdAsync(GetCurrentUserId());
            if (!userBaskets.IsSuccess || !userBaskets.Data.Any())
            {
                return NotFound();
            }

            return CreateActionResult(await _basketService.DeleteAllAsync(GetCurrentUserId()));
        }
    }
}