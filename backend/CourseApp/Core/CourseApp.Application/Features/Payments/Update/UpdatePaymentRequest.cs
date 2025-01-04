using CourseApp.Domain.Entities;

namespace CourseApp.Application.Features.Payments.Update;

public record UpdatePaymentRequest(
            int OrderId,
            int UserId,
            string Address,
            string CardNumber,
            DateTime ExpirationDate,
            string CVC
        );

