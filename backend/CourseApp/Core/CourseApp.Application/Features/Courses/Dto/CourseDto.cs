namespace CourseApp.Application.Features.Courses.Dto;


public record CourseDto(int Id, 
    int CategoryId, 
    string Name, 
    string Description, 
    string Base64Image, 
    decimal Price);


