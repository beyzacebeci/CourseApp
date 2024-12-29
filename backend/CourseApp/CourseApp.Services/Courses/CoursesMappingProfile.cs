using AutoMapper;
using CourseApp.Repositories.Courses;
using CourseApp.Services.Categories.Dto;
using CourseApp.Services.Courses.Create;
using CourseApp.Services.Courses.Update;

namespace CourseApp.Services.Courses;

public class CoursesMappingProfile : Profile
{
    public CoursesMappingProfile()
    {

        CreateMap<Course, CourseDto>().ReverseMap();

        CreateMap<CreateCourseRequest, Course>();

        CreateMap<UpdateCourseRequest, Course>();



    }
}

