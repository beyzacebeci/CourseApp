using AutoMapper;
using CourseApp.Repositories;
using CourseApp.Repositories.Courses;
using CourseApp.Services.Courses.Create;
using CourseApp.Services.Courses.Update;
using CourseApp.Services.Courses.UpdatePrice;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using System.Net;

namespace CourseApp.Services.Courses;

public class CourseService(
    ICourseRepository courseRepository,
    IUnitOfWork unitOfWork,
    IMapper mapper) : ICourseService
{
    public async Task<ServiceResult<List<CourseDto>>> GetAllListAsync()
    {
        var courses = await courseRepository.GetAll().ToListAsync();

        var coursesDto = mapper.Map<List<CourseDto>>(courses);

        return ServiceResult<List<CourseDto>>.Success(coursesDto);
    }


    public async Task<ServiceResult<List<CourseDto>>> GetPagedAllListAsync(int pageNumber, int pageSize)
    {
        
        var courses = await courseRepository.GetAll().Skip((pageNumber - 1) * pageSize).Take(pageSize)
            .ToListAsync(); 

        var coursesDto = mapper.Map<List<CourseDto>>(courses);


        return ServiceResult<List<CourseDto>>.Success(coursesDto);
    }



    public async Task<ServiceResult<CourseDto?>> GetByIdAsync(int id)
    {
        var course = await courseRepository.GetByIdAsync(id);
       
        if (course is null)
        {
            return ServiceResult<CourseDto?>.Fail("Course not found.", HttpStatusCode.NotFound);
        }

        var courseDto = mapper.Map<CourseDto>(course);


        return ServiceResult<CourseDto>.Success(courseDto)!;

    }

    public async Task<ServiceResult<CreateCourseResponse>> CreateAsync(CreateCourseRequest request)
    {
        var isCourseNameExist = await courseRepository.Where(x => x.Name == request.Name).AnyAsync();

        if (isCourseNameExist)
        {
            return ServiceResult<CreateCourseResponse>.Fail("The same course name already exists in the database.",
                HttpStatusCode.NotFound);
        }


        var course = mapper.Map<Course>(request);

        await courseRepository.AddAsync(course);
        await unitOfWork.SaveChangesAsync();
        return ServiceResult<CreateCourseResponse>.SuccessAsCreated(new CreateCourseResponse(course.Id),$"api/courses/{course.Id}");
    }

    public async Task<ServiceResult> UpdateAsync(int id, UpdateCourseRequest request)
    {
        var isCourseNameExist = await courseRepository.Where(x => x.Name == request.Name && x.Id != x.Id).AnyAsync();

        if (isCourseNameExist)
        {
            return ServiceResult.Fail("The same course name already exists in the database.",
                HttpStatusCode.BadRequest);
        }

        var course = mapper.Map<Course>(request);
        course.Id = id;

        courseRepository.Update(course);
        await unitOfWork.SaveChangesAsync();

        return ServiceResult.Success(HttpStatusCode.NoContent);
    }

    public async Task<ServiceResult> UpdatePriceAsync(UpdateCoursePriceRequest request)
    {
        var course = await courseRepository.GetByIdAsync(request.CourseId);

        if (course is null)
        {
            return ServiceResult.Fail("Course not found", HttpStatusCode.NotFound);
        }


        course.Price = request.Quantity;

        courseRepository.Update(course);
        await unitOfWork.SaveChangesAsync();

        return ServiceResult.Success(HttpStatusCode.NoContent);
    }

    public async Task<ServiceResult> DeleteAsync(int id)
    {
        var course = await courseRepository.GetByIdAsync(id);

        courseRepository.Delete(course);
        await unitOfWork.SaveChangesAsync();
        return ServiceResult.Success(HttpStatusCode.NoContent);     
    }

}

