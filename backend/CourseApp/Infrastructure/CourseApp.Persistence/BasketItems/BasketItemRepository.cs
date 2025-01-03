using CourseApp.Application.Contracts.Persistence;
using CourseApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CourseApp.Persistence.BasketItems;

public class BasketItemRepository(CourseAppDbContext context) : GenericRepository<BasketItem, int>(context),
IBasketItemRepository
{
    public async Task<List<BasketItem>> GetAllByUserIdAsync(int userId)
    {
        return await context.BasketItems
            .Where(x => x.UserId == userId)
             .Include(x => x.Course)
            .ThenInclude(c => c.Category)
            .ToListAsync();
    }

    public async Task DeleteAllAsync()
    {
        var allItems = await context.BasketItems.ToListAsync();
        context.BasketItems.RemoveRange(allItems);
    }

}
