using CourseApp.Application.Features.Authentication.Dto;
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
    }
}
