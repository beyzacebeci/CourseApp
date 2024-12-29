﻿using CourseApp.Repositories.Categories;
using CourseApp.Repositories.Courses;
using CourseApp.Services.Categories;
using CourseApp.Services.Categories.Create;
using CourseApp.Services.Categories.Update;
using CourseApp.Services.Filters;
using Microsoft.AspNetCore.Mvc;
namespace CourseApp.API.Controllers;


public class CategoriesController(ICategoryService categoryService) : CustomBaseController
{
    [HttpGet]
    public async Task<IActionResult> GetCategories() => CreateActionResult(await categoryService.GetAllListAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCategory(int id) =>
    CreateActionResult(await categoryService.GetByIdAsync(id));


    [HttpGet("courses")]
    public async Task<IActionResult> GetCategoryWithProducts() =>
        CreateActionResult(await categoryService.GetCategoryWithCoursesAsync());

    [HttpGet("{id}/courses")]
    public async Task<IActionResult> GetCategoryWithProducts(int id) =>
        CreateActionResult(await categoryService.GetCategoryWithCoursesAsync(id));

    [HttpPost]
    public async Task<IActionResult> CreateCategory(CreateCategoryRequest request) =>
        CreateActionResult(await categoryService.CreateAsync(request));

    [ServiceFilter(typeof(NotFoundFilter<Category, int>))]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCategory(int id, UpdateCategoryRequest request) =>
        CreateActionResult(await categoryService.UpdateAsync(id, request));


    [ServiceFilter(typeof(NotFoundFilter<Category, int>))]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCategory(int id) =>
            CreateActionResult(await categoryService.DeleteAsync(id));
}

