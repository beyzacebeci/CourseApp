using CourseApp.Application.Features.Authentication;
using CourseApp.Application.Features.Authentication.Dto;
using Microsoft.AspNetCore.Mvc;

namespace CourseApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService _authService;

        public AuthenticationController(IAuthenticationService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        public async Task<IActionResult> RegisterUser([FromBody] UserForRegistrationDto userForRegistrationDto)
        {
            var result = await _authService.RegisterUser(userForRegistrationDto);

            if (!result.IsSuccess)
                return BadRequest(result);

            if (!result.Data.Succeeded)
                return BadRequest(result.Data.Errors);

            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Authenticate([FromBody] UserForAuthenticationDto user)
        {
            var validationResult = await _authService.ValidateUser(user);

            if (!validationResult.IsSuccess)
                return Unauthorized(validationResult);

            var tokenResult = await _authService.CreateToken(populateExp: true);

            if (!tokenResult.IsSuccess)
                return BadRequest(tokenResult);

            return Ok(tokenResult.Data);
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody] TokenDto tokenDto)
        {
            var result = await _authService.RefreshToken(tokenDto);

            if (!result.IsSuccess)
                return BadRequest(result);

            return Ok(result.Data);
        }
    }
}
