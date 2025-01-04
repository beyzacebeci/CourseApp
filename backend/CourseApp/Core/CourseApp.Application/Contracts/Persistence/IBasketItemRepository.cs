using CourseApp.Domain.Entities;

namespace CourseApp.Application.Contracts.Persistence;

public interface IBasketItemRepository : IGenericRepository<BasketItem, int>
{
    Task<List<BasketItem>> GetAllByUserIdAsync(int userId);
    Task DeleteAllAsync(int userId);


}
