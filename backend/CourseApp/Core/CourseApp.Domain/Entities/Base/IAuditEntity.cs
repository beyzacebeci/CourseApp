namespace CourseApp.Domain.Entities.Base;

public interface IAuditEntity
{
    public DateTime CreatedTime { get; set; }

    public DateTime? UpdatedTime { get; set; }
}


