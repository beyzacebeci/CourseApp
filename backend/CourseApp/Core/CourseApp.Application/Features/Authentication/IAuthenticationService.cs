using CourseApp.Application.Features.Authentication.Dto;
using CourseApp.Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace CourseApp.Application.Features.Authentication
{
    public interface IAuthenticationService
    {
        Task<ServiceResult<IdentityResult>> RegisterUser(UserForRegistrationDto userForRegistrationDto);
        Task<ServiceResult<bool>> ValidateUser(UserForAuthenticationDto userForAuthDto);
        Task<ServiceResult<TokenDto>> CreateToken(bool populateExp);
        Task<ServiceResult<TokenDto>> RefreshToken(TokenDto tokenDto);
        Task<ServiceResult<AppUser>> GetUserById(int userId);
        Task<ServiceResult<bool>> UpdateUser(int userId, UserForUpdateDto userForUpdateDto);
        Task<ServiceResult<bool>> ChangePassword(int userId, ChangePasswordDto changePasswordDto);
        Task<ServiceResult<IEnumerable<AppUser>>> GetAllUsers();

    }
}
