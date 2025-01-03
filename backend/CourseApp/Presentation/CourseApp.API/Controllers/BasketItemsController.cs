using CourseApp.API.Filters;
using CourseApp.Application.Features.BasketItems;
using CourseApp.Application.Features.BasketItems.Create;
using CourseApp.Application.Features.Baskets;
using CourseApp.Application.Features.Categories;
using CourseApp.Application.Features.Categories.Create;
using CourseApp.Domain.Entities;
using CourseApp.Services.Categories;
using Microsoft.AspNetCore.Mvc;

namespace CourseApp.API.Controllers
{
    public class BasketItemsController(IBasketItemService basketService) : CustomBaseController
    {

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBasket(int id) =>
                 CreateActionResult(await basketService.GetByIdAsync(id));

        [HttpPost]
        public async Task<IActionResult> CreateBasket(CreateBasketItemRequest request) =>
        CreateActionResult(await basketService.CreateAsync(request));

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetBasketsByUserId(int userId) =>
         CreateActionResult(await basketService.GetAllByUserIdAsync(userId));

        [ServiceFilter(typeof(NotFoundFilter<Category, int>))]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBasketItem(int id) =>
        CreateActionResult(await basketService.DeleteAsync(id));

        [HttpDelete("delete-all")]
        public async Task<IActionResult> DeleteAllBasketItems() =>
        CreateActionResult(await basketService.DeleteAllAsync());
    }
}
