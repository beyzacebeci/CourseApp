using CourseApp.Domain.Entities;

namespace CourseApp.Application.Features.Payments.Dto
{
    public record PaymentDto(
        int Id,
        int OrderId,
        int UserId,
        string Address,
        string CardNumber,
        DateTime ExpirationDate,
        string CVC
    );
}