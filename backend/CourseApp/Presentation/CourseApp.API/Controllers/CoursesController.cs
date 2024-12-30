using CourseApp.API.Filters;
using CourseApp.Application.Features.Courses;
using CourseApp.Application.Features.Courses.Create;
using CourseApp.Application.Features.Courses.Update;
using CourseApp.Application.Features.Courses.UpdatePrice;
using CourseApp.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace CourseApp.API.Controllers;


public class CoursesController(ICourseService courseService) : CustomBaseController
{
    [HttpGet]
    public async Task<IActionResult> GetAll() => CreateActionResult(await courseService.GetAllListAsync());
   
    [HttpGet("{pageNumber:int}/{pageSize:int}")]
    public async Task<IActionResult> GetPagedAll(int pageNumber, int pageSize) => CreateActionResult(await courseService.GetPagedAllListAsync(pageNumber,pageSize));


    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id) => CreateActionResult(await courseService.GetByIdAsync(id));
   
    [HttpPost]
    public async Task<IActionResult> Create(CreateCourseRequest request) => CreateActionResult(await courseService.CreateAsync(request));

    [ServiceFilter(typeof(NotFoundFilter<Course, int>))]
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, UpdateCourseRequest request) =>
    CreateActionResult(await courseService.UpdateAsync(id, request));


    [HttpPatch("price")]
    public async Task<IActionResult> UpdatePrice(UpdateCoursePriceRequest request) =>
        CreateActionResult(await courseService.UpdatePriceAsync(request));

    [ServiceFilter(typeof(NotFoundFilter<Course, int>))]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id) => CreateActionResult(await courseService.DeleteAsync(id));
}

