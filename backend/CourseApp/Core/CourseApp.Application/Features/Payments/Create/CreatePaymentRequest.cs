using CourseApp.Domain.Entities;

namespace CourseApp.Application.Features.Payments.Create;

public record CreatePaymentRequest(
        int UserId,
        string Address,
        string CardNameSurname,
        string CardNumber,
        string ExpirationDate,
        string CVC
    );
    

