using AutoMapper;
using CourseApp.Application.Features.Orders.Create;
using CourseApp.Application.Features.Orders.Dto;
using CourseApp.Application.Features.Orders.Update;
using CourseApp.Domain.Entities;

namespace CourseApp.Application.Features.Orders;

public class OrdersMappingProfile : Profile
    {
        public OrdersMappingProfile()
        {
            CreateMap<Order, OrderDto>().ReverseMap();

            CreateMap<CreateOrderRequest, Order>();

            CreateMap<UpdateOrderRequest, Order>();

        }
    }

