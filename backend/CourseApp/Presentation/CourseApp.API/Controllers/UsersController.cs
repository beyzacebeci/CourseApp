using CourseApp.Application.Features.Authentication;
using CourseApp.Application.Features.Authentication.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;


[Authorize]
[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly IAuthenticationService _authService;

    public UsersController(IAuthenticationService authService)
    {
        _authService = authService;
    }

    private int GetCurrentUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        return int.Parse(userIdClaim?.Value ?? "0");
    }

    private bool IsEducator()
    {
        return User.IsInRole("Educator");
    }

    [HttpGet("{userId}")]
    public async Task<IActionResult> GetUser(int userId)
    {
        // Sadece kendi bilgilerini veya eğitimci ise herkesi görebilir
        if (userId != GetCurrentUserId() && !IsEducator())
        {
            return Forbid();
        }

        var result = await _authService.GetUserById(userId);

        if (!result.IsSuccess)
            return BadRequest(result);

        return Ok(result.Data);
    }

    [HttpPut("{userId}")]
    public async Task<IActionResult> UpdateUser(int userId, [FromBody] UserForUpdateDto userForUpdateDto)
    {
        // Sadece kendi bilgilerini güncelleyebilir
        if (userId != GetCurrentUserId())
        {
            return Forbid();
        }

        var result = await _authService.UpdateUser(userId, userForUpdateDto);

        if (!result.IsSuccess)
            return BadRequest(result);

        return Ok(result);
    }

    [HttpPost("{userId}/change-password")]
    public async Task<IActionResult> ChangePassword(int userId, [FromBody] ChangePasswordDto changePasswordDto)
    {
        // Sadece kendi şifresini değiştirebilir
        if (userId != GetCurrentUserId())
        {
            return Forbid();
        }

        var result = await _authService.ChangePassword(userId, changePasswordDto);

        if (!result.IsSuccess)
            return BadRequest(result);

        return Ok(result);
    }

    [HttpGet]
    [Authorize(Roles = "Educator")]
    public async Task<IActionResult> GetAllUsers()
    {
        // Bu endpoint sadece Educator rolüne sahip kullanıcılar tarafından erişilebilir
        var result = await _authService.GetAllUsers();

        if (!result.IsSuccess)
            return BadRequest(result);

        return Ok(result.Data);
    }
}
