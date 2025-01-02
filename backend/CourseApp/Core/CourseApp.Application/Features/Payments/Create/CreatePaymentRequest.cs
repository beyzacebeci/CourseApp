using CourseApp.Domain.Entities;

namespace CourseApp.Application.Features.Payments.Create;

public record CreatePaymentRequest(
        int OrderId,
        int UserId,
        string Address,
        string CardNumber,
        DateTime ExpirationDate,
        string CVC,
        PaymentStatus Status
    );
    

