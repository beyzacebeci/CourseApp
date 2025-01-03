using CourseApp.Domain.Entities;

namespace CourseApp.Application.Features.Orders.Create;

public record CreateOrderRequest
{
    public int UserId { get; init; }
    public int PaymentId { get; init; }
    public decimal TotalPrice { get; init; }
    public List<int> CourseIds { get; init; } = new(); // Eklenecek kursların ID'leri
}


