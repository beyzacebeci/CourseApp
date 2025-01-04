using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseApp.Application.Features.Payments.Create
{
    public class CreatePaymentRequestValidator : AbstractValidator<CreatePaymentRequest>
    {
        public CreatePaymentRequestValidator()
        {
            RuleFor(x => x.UserId)
                 .NotEmpty().WithMessage("Address is required.");

            RuleFor(x => x.Address)
               .NotEmpty().WithMessage("Address is required.")
               .MaximumLength(200).WithMessage("Address must not exceed 200 characters.")
               .Must(address => !string.IsNullOrWhiteSpace(address.Trim())).WithMessage("Address cannot contain only spaces.");

            RuleFor(x => x.ExpirationDate)
               .NotEmpty().WithMessage("Expiration date is required.")
               .MaximumLength(7).WithMessage("Expiration date must not exceed 7 characters.")
               .Matches(@"^\d{4}-(0[1-9]|1[0-2])$").WithMessage("Expiration date must be in the format yyyy-MM.");


            RuleFor(x => x.CardNameSurname)
                .NotEmpty().WithMessage("Name and Surname is required.")
                .MaximumLength(100).WithMessage("Name and Surname must not exceed 100 characters.");
            
            RuleFor(x => x.CVC)
                .NotEmpty().WithMessage("CVC is required.")
                .Length(3, 4).WithMessage("CVC must be 3 or 4 digits long.")
                .Matches(@"^\d+$").WithMessage("CVC must contain only digits.");


            RuleFor(x => x.CardNumber)
                .NotEmpty().WithMessage("CardNumber is required.")
                .Length(16).WithMessage("CardNumber must be exactly 16 digits.")
                .Matches(@"^\d+$").WithMessage("CardNumber must contain only digits.");




        }
    }
}
