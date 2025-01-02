using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseApp.Application.Features.Orders.Dto
{
    public record OrderDto(int Id, int UserId, decimal TotalPrice);
}
