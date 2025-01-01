using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseApp.Application.Features.Authentication.Dto
{
    public record TokenDto
    {
        public String AccessToken { get; init; }
        public String RefreshToken { get; init; }

    }
}
