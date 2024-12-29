namespace CourseApp.Repositories;

public interface IAuditEntity
{
    public DateTime CreatedTime { get; set; }

    public DateTime? UpdatedTime { get; set; }
}


