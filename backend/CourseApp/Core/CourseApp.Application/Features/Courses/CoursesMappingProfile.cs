using AutoMapper;
using CourseApp.Application.Features.Courses.Create;
using CourseApp.Application.Features.Courses.Dto;
using CourseApp.Application.Features.Courses.Update;
using CourseApp.Domain.Entities;


namespace CourseApp.Application.Features.Courses;

public class CoursesMappingProfile : Profile
{
    public CoursesMappingProfile()
    {

        CreateMap<Course, CourseDto>().ReverseMap();

        CreateMap<CreateCourseRequest, Course>();

        CreateMap<UpdateCourseRequest, Course>();



    }
}

