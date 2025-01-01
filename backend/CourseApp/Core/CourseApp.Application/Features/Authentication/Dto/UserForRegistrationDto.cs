using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseApp.Application.Features.Authentication.Dto
{
    public record UserForRegistrationDto
    {
        public string Name { get; set; } = default!;
        public string Surname { get; set; } = default!;
       
        [Required(ErrorMessage = "Username is required.")]
        public string? UserName { get; init; }
        public string? Email { get; init; }

        [Required(ErrorMessage = "Password is required.")]
        public string? Password { get; init; }
        public ICollection<string>? Roles { get; init; }
    }
}
