using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseApp.Application.Features.Authentication.Dto
{
    public record ChangePasswordDto
    {
        [Required]
        public string CurrentPassword { get; init; } = default!;

        [Required]
        public string NewPassword { get; init; } = default!;

        [Required]
        [Compare("NewPassword", ErrorMessage = "The new password and confirmation password do not match.")]
        public string ConfirmNewPassword { get; init; } = default!;
    }
}
