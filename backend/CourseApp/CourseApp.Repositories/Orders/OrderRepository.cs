using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseApp.Repositories.Orders
{
    public class OrderRepository(CourseAppDbContext context) : GenericRepository<Order>(context), IOrderRepository
    {
    }
}
