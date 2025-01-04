using AutoMapper;
using CourseApp.Application.Features.Authentication.Dto;
using CourseApp.Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using Microsoft.EntityFrameworkCore;

namespace CourseApp.Application.Features.Authentication
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        private readonly IConfiguration _configuration;

        private AppUser _user = default!;

        public AuthenticationService(IMapper mapper, UserManager<AppUser> userManager, IConfiguration configuration)
        {
            _mapper = mapper;
            _userManager = userManager;
            _configuration = configuration;
        }

        public async Task<ServiceResult<AppUser>> GetUserById(int userId)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(userId.ToString());

                if (user == null)
                    return ServiceResult<AppUser>.Fail("User not found", HttpStatusCode.NotFound);

                return ServiceResult<AppUser>.Success(user);
            }
            catch (Exception ex)
            {
                return ServiceResult<AppUser>.Fail(ex.Message);
            }
        }
        public async Task<ServiceResult<bool>> UpdateUser(int userId, UserForUpdateDto userForUpdateDto)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(userId.ToString());

                if (user == null)
                    return ServiceResult<bool>.Fail("User not found", HttpStatusCode.NotFound);

                user.Name = userForUpdateDto.Name;
                user.Surname = userForUpdateDto.Surname;
                user.Email = userForUpdateDto.Email ?? user.Email;
                user.UserName = userForUpdateDto.UserName ?? user.UserName;

                var result = await _userManager.UpdateAsync(user);

                if (!result.Succeeded)
                    return ServiceResult<bool>.Fail(result.Errors.First().Description);

                return ServiceResult<bool>.Success(true);
            }
            catch (Exception ex)
            {
                return ServiceResult<bool>.Fail(ex.Message);
            }
        }

        public async Task<ServiceResult<IEnumerable<AppUser>>> GetAllUsers()
        {
            try
            {
                var users = await _userManager.Users.ToListAsync();
                return ServiceResult<IEnumerable<AppUser>>.Success(users);
            }
            catch (Exception ex)
            {
                return ServiceResult<IEnumerable<AppUser>>.Fail(ex.Message);
            }
        }



        public async Task<ServiceResult<bool>> ChangePassword(int userId, ChangePasswordDto changePasswordDto)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(userId.ToString());

                if (user == null)
                    return ServiceResult<bool>.Fail("User not found", HttpStatusCode.NotFound);

                var result = await _userManager.ChangePasswordAsync(user,
                    changePasswordDto.CurrentPassword,
                    changePasswordDto.NewPassword);

                if (!result.Succeeded)
                    return ServiceResult<bool>.Fail(result.Errors.First().Description);

                return ServiceResult<bool>.Success(true);
            }
            catch (Exception ex)
            {
                return ServiceResult<bool>.Fail(ex.Message);
            }
        }
        public async Task<ServiceResult<TokenDto>> CreateToken(bool populateExp)
        {
            try
            {
                var signinCredentials = GetSiginCredentials();
                var claims = await GetClaims();
                var tokenOptions = GenerateTokenOptions(signinCredentials, claims);

                var refreshToken = GenerateRefreshToken();
                _user.RefreshToken = refreshToken;

                if (populateExp)
                    _user.RefreshTokenExpiryTime = DateTime.Now.AddDays(7);

                await _userManager.UpdateAsync(_user);

                var accessToken = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
                var tokenDto = new TokenDto()
                {
                    AccessToken = accessToken,
                    RefreshToken = refreshToken
                };

                return ServiceResult<TokenDto>.Success(tokenDto);
            }
            catch (Exception ex)
            {
                return ServiceResult<TokenDto>.Fail(ex.Message, HttpStatusCode.InternalServerError);
            }
        }

        public async Task<ServiceResult<IdentityResult>> RegisterUser(UserForRegistrationDto userForRegistrationDto)
        {
            try
            {
                var user = _mapper.Map<AppUser>(userForRegistrationDto);
                var result = await _userManager.CreateAsync(user, userForRegistrationDto.Password);

                if (result.Succeeded)
                    await _userManager.AddToRolesAsync(user, userForRegistrationDto.Roles);

                return ServiceResult<IdentityResult>.Success(result);
            }
            catch (Exception ex)
            {
                return ServiceResult<IdentityResult>.Fail(ex.Message);
            }
        }

        public async Task<ServiceResult<bool>> ValidateUser(UserForAuthenticationDto userForAuthDto)
        {
            try
            {
                _user = await _userManager.FindByNameAsync(userForAuthDto.UserName);
                var result = (_user != null && await _userManager.CheckPasswordAsync(_user, userForAuthDto.Password));

                if (!result)
                    return ServiceResult<bool>.Fail("Authentication failed. Wrong username or password.", HttpStatusCode.Unauthorized);

                return ServiceResult<bool>.Success(true);
            }
            catch (Exception ex)
            {
                return ServiceResult<bool>.Fail(ex.Message);
            }
        }

        //-------------
        private SigningCredentials GetSiginCredentials()
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var key = Encoding.UTF8.GetBytes(jwtSettings["secretKey"]);
            var secret = new SymmetricSecurityKey(key);
            return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
        }

        private async Task<List<Claim>> GetClaims()
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, _user.UserName),
                new Claim(ClaimTypes.NameIdentifier, _user.Id.ToString())
            };

            var roles = await _userManager
                .GetRolesAsync(_user);

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            return claims;
        }

        private JwtSecurityToken GenerateTokenOptions(SigningCredentials signinCredentials,
        List<Claim> claims)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");

            var tokenOptions = new JwtSecurityToken(
                    issuer: jwtSettings["validIssuer"],
                    audience: jwtSettings["validAudience"],
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(Convert.ToDouble(jwtSettings["expires"])),
                    signingCredentials: signinCredentials);

            return tokenOptions;
        }
        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var secretKey = jwtSettings["secretKey"];

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = jwtSettings["validIssuer"],
                ValidAudience = jwtSettings["validAudience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;

            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters,
                out securityToken);

            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken is null ||
                !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256,
                StringComparison.InvariantCultureIgnoreCase))
            {
                throw new SecurityTokenException("Invalid token.");
            }
            return principal;
        }
        public async Task<ServiceResult<TokenDto>> RefreshToken(TokenDto tokenDto)
        {
            try
            {
                var principal = GetPrincipalFromExpiredToken(tokenDto.AccessToken);
                var user = await _userManager.FindByNameAsync(principal.Identity.Name);

                if (user is null ||
                    user.RefreshToken != tokenDto.RefreshToken ||
                    user.RefreshTokenExpiryTime <= DateTime.Now)
                {
                    return ServiceResult<TokenDto>.Fail("Invalid refresh token or expired refresh token.", HttpStatusCode.Unauthorized);
                }

                _user = user;
                return await CreateToken(populateExp: false);
            }
            catch (SecurityTokenException ex)
            {
                return ServiceResult<TokenDto>.Fail(ex.Message, HttpStatusCode.Unauthorized);
            }
            catch (Exception ex)
            {
                return ServiceResult<TokenDto>.Fail(ex.Message);
            }
        }


    }
}
