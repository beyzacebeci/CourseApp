using CourseApp.Domain.Entities.Base;
using CourseApp.Domain.Entities.Identity;

namespace CourseApp.Domain.Entities;

public class Payment : BaseEntity<int>, IAuditEntity
{
    public int UserId { get; set; }
    public string CardNameSurname { get; set; } = default!;
    public string Address { get; set; } = default!;
    public string CardNumber { get; set; } = default!;
    public string ExpirationDate { get; set; } = default!;
    public string CVC { get; set; } = default!;
    public AppUser User { get; set; } = default!;
    public Order? Order { get; set; } 
    public DateTime CreatedTime { get; set; }
    public DateTime? UpdatedTime { get; set; }
}


