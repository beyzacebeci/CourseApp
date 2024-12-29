using FluentValidation;

namespace CourseApp.Services.Courses.Create;

public class CreateCourseRequestValidator : AbstractValidator<CreateCourseRequest>
{
    public CreateCourseRequestValidator()
    {


        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Product name is required.")
            .MinimumLength(3).WithMessage("Product name must be at least 3 characters long.")
            .MaximumLength(100).WithMessage("Product name must not exceed 100 characters.");


        RuleFor(x => x.Description)
            .NotEmpty().WithMessage("Description is required.")
            .MinimumLength(5).WithMessage("Description must be at least 5characters long.")
            .MaximumLength(200).WithMessage("Description must not exceed 200 characters.");


        RuleFor(x => x.CategoryId)
            .GreaterThanOrEqualTo(0).WithMessage("CategoryId price must be greater than or equal to 0.");



        RuleFor(x => x.Price)
                    .NotEmpty().WithMessage("Price is required.")
            .GreaterThanOrEqualTo(0).WithMessage("Product price must be greater than or equal to 0.");
    }

}


