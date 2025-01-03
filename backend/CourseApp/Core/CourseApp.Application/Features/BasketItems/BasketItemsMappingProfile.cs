using AutoMapper;
using CourseApp.Application.Features.BasketItems.Create;
using CourseApp.Application.Features.BasketItems.Dto;
using CourseApp.Application.Features.Baskets.Update;
using CourseApp.Domain.Entities;

namespace CourseApp.Application.Features.BasketItems
{
    public class BasketItemsMappingProfile : Profile
    {
        public BasketItemsMappingProfile()
        {
            CreateMap<BasketItem, BasketItemDto>().ReverseMap();
            CreateMap<CreateBasketItemRequest, BasketItem>();
            CreateMap<UpdateBasketRequest, BasketItem>();
        }

    }
}