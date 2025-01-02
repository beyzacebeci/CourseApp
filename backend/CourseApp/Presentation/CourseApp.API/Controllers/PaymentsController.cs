using CourseApp.API.Filters;
using CourseApp.Application.Features.Courses.Create;
using CourseApp.Application.Features.Courses.Update;
using CourseApp.Application.Features.Courses;
using CourseApp.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CourseApp.Application.Features.Payments;
using CourseApp.Application.Features.Payments.Create;

namespace CourseApp.API.Controllers;

public class PaymentsController(IPaymentService paymentService) : CustomBaseController
{
    [HttpPost]
    public async Task<IActionResult> Create(CreatePaymentRequest request) => CreateActionResult(await paymentService.CreateAsync(request));



}

