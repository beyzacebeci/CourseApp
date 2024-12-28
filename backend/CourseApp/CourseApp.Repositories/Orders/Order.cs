using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseApp.Repositories.Orders
{
    public class Order
    {
        public int Id { get; set; }
        public string Description { get; set; } = default!;
        public string Address { get; set; } = default!;
        public decimal TotalPrice { get; set; }
    }
}
