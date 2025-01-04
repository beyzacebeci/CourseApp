
using Microsoft.AspNetCore.Identity;


namespace CourseApp.Domain.Entities.Identity;

public class AppUser : IdentityUser<int>
{
    public string Name { get; set; } = default!;
    public string Surname { get; set; } = default!;
    public String? RefreshToken { get; set; }
    public DateTime RefreshTokenExpiryTime { get; set; }
    public List<BasketItem>? BasketItems { get; set; }

}

