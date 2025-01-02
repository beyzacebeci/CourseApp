using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CourseApp.Persistence.Users
{
    public class UserRoleConfiguration : IEntityTypeConfiguration<IdentityUserRole<int>>
    {
        public void Configure(EntityTypeBuilder<IdentityUserRole<int>> builder)
        {
            builder.HasData(
                new IdentityUserRole<int>
                {
                    UserId = 1, 
                    RoleId = 1  
                },
                new IdentityUserRole<int>
                {
                    UserId = 1, 
                    RoleId = 2  
                },
                new IdentityUserRole<int>
                {
                    UserId = 2, 
                    RoleId = 1  
                }
            );
        }
    }
}