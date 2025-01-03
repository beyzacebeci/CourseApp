using CourseApp.Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CourseApp.Persistence.Users
{
    public class UserConfiguration : IEntityTypeConfiguration<AppUser>
    {
        public void Configure(EntityTypeBuilder<AppUser> builder)
        {
            var hasher = new PasswordHasher<AppUser>();

            var educator = new AppUser
            {
                Id = 1,
                UserName = "educator",
                NormalizedUserName = "EDUCATOR",
                Email = "educator@gmail.com",
                NormalizedEmail = "EDUCATOR@GMAIL.COM",
                Name = "educator",
                Surname = "educator",
                SecurityStamp = Guid.NewGuid().ToString(),
                ConcurrencyStamp = Guid.NewGuid().ToString(),
                RefreshToken = null,
                RefreshTokenExpiryTime = DateTime.UtcNow
            };
            var user = new AppUser
            {
                Id = 2,
                UserName = "user",
                NormalizedUserName = "USER",
                Email = "user@gmail.com",
                NormalizedEmail = "USER@GMAIL.COM",
                Name = "user",
                Surname = "user",
                SecurityStamp = Guid.NewGuid().ToString(),
                ConcurrencyStamp = Guid.NewGuid().ToString(),
                RefreshToken = null,
                RefreshTokenExpiryTime = DateTime.UtcNow
            };

            educator.PasswordHash = hasher.HashPassword(educator, "Educator123.");
            user.PasswordHash = hasher.HashPassword(user, "User123.");

            builder.HasData(educator,user);
        }
    }
}
