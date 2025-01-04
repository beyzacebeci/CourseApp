using CourseApp.Application.Features.Payments;
using CourseApp.Application.Features.Payments.Create;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CourseApp.API.Controllers;

[Authorize]
public class PaymentsController(IPaymentService paymentService) : CustomBaseController
{
    [HttpPost]
    public async Task<IActionResult> Create(CreatePaymentRequest request) => CreateActionResult(await paymentService.CreateAsync(request));

}

