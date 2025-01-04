
using CourseApp.Application.Features.BasketItems.Create;
using CourseApp.Application.Features.BasketItems.Dto;
using CourseApp.Application.Features.Baskets.Update;

namespace CourseApp.Application.Features.BasketItems;

public interface IBasketItemService
{
    Task<ServiceResult<List<BasketItemDto>>> GetAllByUserIdAsync(int userId);

    Task<ServiceResult<BasketItemDto>> GetByIdAsync(int id);
    Task<ServiceResult<int>> CreateAsync(CreateBasketItemRequest request);
    Task<ServiceResult> UpdateAsync(int id, UpdateBasketRequest request);
    Task<ServiceResult> DeleteAsync(int id);
    Task<ServiceResult> DeleteAllAsync(int userId);


}
