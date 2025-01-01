using CourseApp.Domain.Entities.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseApp.Persistence.Users
{
    public class RoleConfiguration : IEntityTypeConfiguration<AppRole>
    {
        public void Configure(EntityTypeBuilder<AppRole> builder)
        {
            builder.HasData(
                new AppRole
                {
                    Id = 1,
                    Name = "User",
                    NormalizedName = "USER"
                },
                new AppRole
                {
                    Id = 2,
                    Name = "Educator",
                    NormalizedName = "EDUCATOR"
                }
                );
        }
    }
}
