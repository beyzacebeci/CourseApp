using AutoMapper;
using CourseApp.Repositories;
using CourseApp.Repositories.Categories;
using CourseApp.Services.Categories.Create;
using CourseApp.Services.Categories.Dto;
using CourseApp.Services.Categories.Update;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace CourseApp.Services.Categories;

public class CategoryService(
    ICategoryRepository categoryRepository, 
    IUnitOfWork unitOfWork,
    IMapper mapper) : ICategoryService
{
    public async Task<ServiceResult<CategoryWithCoursesDto>> GetCategoryWithCoursesAsync(int categoryId)
    {
        var category = await categoryRepository.GetCategoryWithCoursesAsync(categoryId);

        if (category is null)
        {
            return ServiceResult<CategoryWithCoursesDto>.Fail("Category is not found.", HttpStatusCode.NotFound);
        }

        var categoryDto = mapper.Map<CategoryWithCoursesDto>(category);

        return ServiceResult<CategoryWithCoursesDto>.Success(categoryDto);
    }

    public async Task<ServiceResult<List<CategoryWithCoursesDto>>> GetCategoryWithCoursesAsync()
    {
        var category = await categoryRepository.GetCategoryWithCourses().ToListAsync();


        var categoriesDto = mapper.Map<List<CategoryWithCoursesDto>>(category);

        return ServiceResult<List<CategoryWithCoursesDto>>.Success(categoriesDto);
    }


    public async Task<ServiceResult<List<CategoryDto>>>GetAllListAsync()
    {
        var categories = await categoryRepository.GetAll().ToListAsync();

        var categoriesDto = mapper.Map<List<CategoryDto>>(categories);

        return ServiceResult<List<CategoryDto>>.Success(categoriesDto);
    }

    public async Task<ServiceResult<CategoryDto>> GetByIdAsync(int id)
    {
        var category = await categoryRepository.GetByIdAsync(id);

        if(category is null)
        {
            return ServiceResult<CategoryDto>.Fail("Category is not found", HttpStatusCode.NotFound);
        }
        var categoryDto = mapper.Map<CategoryDto>(category);
        return ServiceResult<CategoryDto>.Success(categoryDto);
    }

    public async Task<ServiceResult<int>> CreateAsync(CreateCategoryRequest request)

    {
        var anyCategory = await categoryRepository.Where(x => x.Name == request.Name).AnyAsync();

        if (anyCategory)
        {
            return ServiceResult<int>.Fail("The same category name already exists in the database.",
                HttpStatusCode.NotFound);
        }


        var newCategory = mapper.Map<Category>(request);


        await categoryRepository.AddAsync(newCategory);
        await unitOfWork.SaveChangesAsync();

        return ServiceResult<int>.SuccessAsCreated(newCategory.Id, $"api/categories/{newCategory.Id}");

    }

    public async Task<ServiceResult> UpdateAsync(int id, UpdateCategoryRequest request)
    {
        var isCategoryNameExist = await categoryRepository.Where(x => x.Name == request.Name && x.Id != x.Id).AnyAsync();

        if (isCategoryNameExist)
        {
            return ServiceResult.Fail("The same category name already exists in the database.",
                HttpStatusCode.BadRequest);
        }

        var category = mapper.Map<Category>(request);
        category.Id = id;

        categoryRepository.Update(category);
        await unitOfWork.SaveChangesAsync();

        return ServiceResult.Success(HttpStatusCode.NoContent);

    }

    public async Task<ServiceResult> DeleteAsync(int id)
    {
        var category = await categoryRepository.GetByIdAsync(id);

        categoryRepository.Delete(category!);
        await unitOfWork.SaveChangesAsync();

        return ServiceResult.Success(HttpStatusCode.NoContent);
    }
}
