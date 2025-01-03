namespace CourseApp.Application.Features.Baskets.Update
{
    public record UpdateBasketRequest(
    int UserId,
    decimal TotalPrice);
}