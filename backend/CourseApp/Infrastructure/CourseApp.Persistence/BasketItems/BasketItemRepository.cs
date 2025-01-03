using CourseApp.Application.Contracts.Persistence;
using CourseApp.Domain.Entities;

namespace CourseApp.Persistence.BasketItems;

public class BasketItemRepository(CourseAppDbContext context) : GenericRepository<BasketItem, int>(context),
IBasketItemRepository
{

}
