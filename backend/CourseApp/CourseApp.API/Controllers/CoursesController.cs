using CourseApp.Services.Courses;
using CourseApp.Services.Courses.Create;
using CourseApp.Services.Courses.Update;
using CourseApp.Services.Courses.UpdatePrice;
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


    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, UpdateCourseRequest request) =>
    CreateActionResult(await courseService.UpdateAsync(id, request));


    [HttpPatch("price")]
    public async Task<IActionResult> UpdatePrice(UpdateCoursePriceRequest request) =>
        CreateActionResult(await courseService.UpdatePriceAsync(request));

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id) => CreateActionResult(await courseService.DeleteAsync(id));
}

