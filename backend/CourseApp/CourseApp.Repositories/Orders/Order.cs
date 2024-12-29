namespace CourseApp.Repositories.Orders;

public class Order : BaseEntity<int>
    {
        public string Description { get; set; } = default!;
        public string Address { get; set; } = default!;
        public decimal TotalPrice { get; set; }
    }

