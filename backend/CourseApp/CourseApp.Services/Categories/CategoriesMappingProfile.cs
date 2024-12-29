using AutoMapper;
using CourseApp.Repositories.Categories;
using CourseApp.Services.Categories.Create;
using CourseApp.Services.Categories.Dto;
using CourseApp.Services.Categories.Update;

namespace CourseApp.Services.Categories;

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

