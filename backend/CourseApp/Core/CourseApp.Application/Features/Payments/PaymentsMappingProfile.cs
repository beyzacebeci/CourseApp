using AutoMapper;
using CourseApp.Application.Features.Payments.Create;
using CourseApp.Application.Features.Payments.Dto;
using CourseApp.Application.Features.Payments.Update;
using CourseApp.Domain.Entities;

namespace CourseApp.Application.Features.Payments;

public class PaymentsMappingProfile : Profile
    {
    public PaymentsMappingProfile()
    {
        CreateMap<Payment, PaymentDto>().ReverseMap();

        CreateMap<CreatePaymentRequest, Payment>();

        CreateMap<UpdatePaymentRequest, Order>();
    }
}

