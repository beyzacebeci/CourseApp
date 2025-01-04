using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseApp.Application.Features.Authentication.Dto
{
    public record UserForUpdateDto
    {
        public string Name { get; init; } = default!;
        public string Surname { get; init; } = default!;
        public string? Email { get; init; }
        public string? UserName { get; init; }
    }
}
