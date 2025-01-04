using AutoMapper;
using CourseApp.Application.Contracts.Persistence;
using CourseApp.Application.Features.BasketItems.Dto;
using CourseApp.Application.Features.Orders.Create;
using CourseApp.Application.Features.Orders.Dto;
using CourseApp.Application.Features.Payments.Create;
using CourseApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace CourseApp.Application.Features.Orders;

public class OrderService(
    IOrderRepository orderRepository, 
    IUnitOfWork unitOfWork,
    IMapper mapper) : IOrderService
{
    public async Task<ServiceResult<List<OrderDto>>> GetAllByUserIdAsync(int userId)
    {
        var orders = await orderRepository.GetAllByUserIdAsync(userId);
        var ordersDto = mapper.Map<List<OrderDto>>(orders);
        return ServiceResult<List<OrderDto>>.Success(ordersDto);
    }
    //public async Task<ServiceResult<int>> CreateAsync(CreateOrderRequest request)

    //{
    //    var newOrder = mapper.Map<Order>(request);
    //    await orderRepository.AddAsync(newOrder);
    //    await unitOfWork.SaveChangesAsync();

    //    return ServiceResult<int>.SuccessAsCreated(newOrder.Id, $"api/orders/{newOrder.Id}");

    //}

    public async Task<ServiceResult<int>> CreateAsync(CreateOrderRequest request)
    {
        if (request.CourseIds == null || !request.CourseIds.Any())
        {
            return ServiceResult<int>.Fail(
                errorMessage: "En az bir kurs seçilmelidir",
                statusCode: HttpStatusCode.BadRequest
            );
        }

        var newOrder = mapper.Map<Order>(request);
        await orderRepository.CreateWithCoursesAsync(newOrder, request.CourseIds);
        await unitOfWork.SaveChangesAsync();

        return ServiceResult<int>.SuccessAsCreated(
            data: newOrder.Id,
            urlAsCreated: $"api/orders/{newOrder.Id}"
        );
    }



}

