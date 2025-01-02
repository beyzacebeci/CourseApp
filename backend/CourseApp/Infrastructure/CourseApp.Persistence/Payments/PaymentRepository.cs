using CourseApp.Application.Contracts.Persistence;
using CourseApp.Domain.Entities;


namespace CourseApp.Persistence.Payments;

public class PaymentRepository(CourseAppDbContext context) : GenericRepository<Payment, int>(context), IPaymentRepository
{
}

