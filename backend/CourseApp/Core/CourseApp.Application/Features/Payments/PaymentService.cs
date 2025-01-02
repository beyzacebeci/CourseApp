using AutoMapper;
using CourseApp.Application.Contracts.Persistence;
using CourseApp.Application.Features.Categories.Create;
using CourseApp.Application.Features.Payments.Create;
using CourseApp.Domain.Entities;
using System.Net;

namespace CourseApp.Application.Features.Payments;

public class PaymentService(
    IPaymentRepository paymentRepository,
    IUnitOfWork unitOfWork,
    IMapper mapper) : IPaymentService
{
    public async Task<ServiceResult<int>> CreateAsync(CreatePaymentRequest request)

    {
        var newPayment = mapper.Map<Payment>(request);


        await paymentRepository.AddAsync(newPayment);
        await unitOfWork.SaveChangesAsync();

        return ServiceResult<int>.SuccessAsCreated(newPayment.Id, $"api/payments/{newPayment.Id}");

    }
}

