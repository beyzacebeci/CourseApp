using CourseApp.Application.Contracts.Persistence;
using CourseApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CourseApp.Persistence.Orders;

public class OrderRepository(CourseAppDbContext context) : GenericRepository<Order, int>(context), IOrderRepository
{
    public async Task<List<Order>> GetAllByUserIdAsync(int userId)
    {
        return await context.Orders
            .Include(o => o.Courses) // Kursları include ediyoruz
            .Where(x => x.UserId == userId)
            .ToListAsync();
    }
    public async Task<Order> CreateWithCoursesAsync(Order order, List<int> courseIds)
    {
        // Seçilen kursları veritabanından çek
        var courses = await context.Courses
            .Where(c => courseIds.Contains(c.Id))
            .ToListAsync();

        if (courses.Count != courseIds.Count)
        {
            throw new InvalidOperationException("Bir veya daha fazla kurs bulunamadı");
        }

        order.Courses = courses;
        await context.Orders.AddAsync(order);

        return order;
    }
}

