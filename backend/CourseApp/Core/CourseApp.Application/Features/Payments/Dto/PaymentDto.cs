using CourseApp.Domain.Entities;

namespace CourseApp.Application.Features.Payments.Dto
{
    public record PaymentDto(
        int Id,
        int UserId,
        string Address,
        string CardNumber,
        string ExpirationDate,
        string CVC
    );
}