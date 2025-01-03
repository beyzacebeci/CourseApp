namespace CourseApp.Application.Features.BasketItems.Dto;

public record BasketItemDto
{
    public int Id { get; init; }
    public int UserId { get; init; }
    public int CourseId { get; init; }
    public string CourseName { get; init; } = default!;
    public decimal CoursePrice { get; init; }
    public string CategoryName { get; init; } = default!;
    public DateTime CreatedTime { get; init; }
}