using CourseApp.Application.Features.BasketItems;
using CourseApp.Application.Features.BasketItems.Create;
using CourseApp.Application.Features.Baskets;
using CourseApp.Application.Features.Categories;
using CourseApp.Application.Features.Categories.Create;
using Microsoft.AspNetCore.Mvc;

namespace CourseApp.API.Controllers
{
    public class BasketItemsController(IBasketItemService basketService) : CustomBaseController
    {
        [HttpGet]
        public async Task<IActionResult> GetBaskets() => CreateActionResult(await basketService.GetAllListAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBasket(int id) =>
                 CreateActionResult(await basketService.GetByIdAsync(id));

        [HttpPost]
        public async Task<IActionResult> CreateBasket(CreateBasketItemRequest request) =>
        CreateActionResult(await basketService.CreateAsync(request));
    }
}
