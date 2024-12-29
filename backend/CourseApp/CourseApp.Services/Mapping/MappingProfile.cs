using AutoMapper;
using CourseApp.Repositories.Courses;
using CourseApp.Services.Courses;

namespace CourseApp.Services.Mapping;

public class MappingProfile : Profile
    {
        public MappingProfile() {

            CreateMap<Course,CourseDto>().ReverseMap();
        
        
        }
    }

