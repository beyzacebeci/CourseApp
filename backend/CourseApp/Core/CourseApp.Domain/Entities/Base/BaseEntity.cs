namespace CourseApp.Domain.Entities.Base;

public class BaseEntity<T>
{
    public T Id { get; set; } = default!;
}

