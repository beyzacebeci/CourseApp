using AutoMapper;
using CourseApp.Application.Features.Categories.Create;
using CourseApp.Application.Features.Categories.Dto;
using CourseApp.Application.Features.Categories.Update;
using CourseApp.Domain.Entities;

namespace CourseApp.Application.Features.Categories;

public class CategoriesMappingProfile : Profile
{
    public CategoriesMappingProfile()
    {
        CreateMap<CategoryDto, Category>().ReverseMap();
        CreateMap<Category, CategoryWithCoursesDto>().ReverseMap();

        CreateMap<CreateCategoryRequest, Category>();

        CreateMap<UpdateCategoryRequest, Category>();



    }
}

