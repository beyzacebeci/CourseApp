using AutoMapper;
using CourseApp.Application.Features.Authentication.Dto;
using CourseApp.Domain.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseApp.Application.Features.Authentication
{
    public class AuthMappingProfile : Profile
    {
        public AuthMappingProfile()
        {
            CreateMap<UserForRegistrationDto, AppUser>();

        }
    }
}
