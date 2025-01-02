using CourseApp.Application.Features.Categories.Create;
using CourseApp.Application.Features.Payments.Create;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CourseApp.Application.Features.Payments
{
    public interface IPaymentService
    {
        Task<ServiceResult<int>> CreateAsync(CreatePaymentRequest request);

    }
}
