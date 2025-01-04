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
            CreateMap<BasketItem, BasketItemDto>()
                 .ForMember(dest => dest.CourseName, opt => opt.MapFrom(src => src.Course.Name))
                .ForMember(dest => dest.CoursePrice, opt => opt.MapFrom(src => src.Course.Price))
                   .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Course.Category.Name));

            CreateMap<BasketItemDto, BasketItem>();

            CreateMap<CreateBasketItemRequest, BasketItem>();
            CreateMap<UpdateBasketRequest, BasketItem>();
        }

    }
}