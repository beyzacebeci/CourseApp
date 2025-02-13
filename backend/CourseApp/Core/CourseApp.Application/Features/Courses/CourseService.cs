﻿using AutoMapper;
using CourseApp.Application.Contracts.Persistence;
using CourseApp.Application.Features.Courses.Create;
using CourseApp.Application.Features.Courses.Dto;
using CourseApp.Application.Features.Courses.Update;
using CourseApp.Application.Features.Courses.UpdatePrice;
using CourseApp.Domain.Entities;
using System.Net;

namespace CourseApp.Application.Features.Courses;

public class CourseService(
    ICourseRepository courseRepository,
    IUnitOfWork unitOfWork,
    IMapper mapper) : ICourseService
{
    public async Task<ServiceResult<List<CourseDto>>> GetAllListAsync()
    {
        var courses = await courseRepository.GetAllAsync();

        var coursesDto = mapper.Map<List<CourseDto>>(courses);

        return ServiceResult<List<CourseDto>>.Success(coursesDto);
    }


    public async Task<ServiceResult<List<CourseDto>>> GetPagedAllListAsync(int pageNumber, int pageSize)
    {

        var courses = await courseRepository.GetAllPagedAsync(pageNumber, pageSize);

        var coursesDto = mapper.Map<List<CourseDto>>(courses);


        return ServiceResult<List<CourseDto>>.Success(coursesDto);


    }

    public async Task<ServiceResult<List<CourseDto>>> GetPagedByCategoryIdsAsync(int pageNumber, int pageSize, List<int?> categoryIds)
    {
        var courses = await courseRepository.GetAllPagedByCategoryIdsAsync(pageNumber, pageSize, categoryIds);
        var coursesDto = mapper.Map<List<CourseDto>>(courses);
        return ServiceResult<List<CourseDto>>.Success(coursesDto);
    }

    public async Task<ServiceResult<int>> GetTotalCourseCountAsync()
    {
        int totalCount = await courseRepository.CountAsync();
        return ServiceResult<int>.Success(totalCount);

    }
    public async Task<ServiceResult<int>> GetTotalCourseCountByCategoryIdAsync(int categoryId)
    {
        int totalCount = await courseRepository.CountByCategoryIdAsync(categoryId);
        return ServiceResult<int>.Success(totalCount);
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
        var isCourseNameExist = await courseRepository.AnyAsync(x => x.Name == request.Name);

        if (isCourseNameExist)
        {
            return ServiceResult<CreateCourseResponse>.Fail("The same course name already exists in the database.",
                HttpStatusCode.NotFound);
        }

        var course = mapper.Map<Course>(request);

        await courseRepository.AddAsync(course);
        await unitOfWork.SaveChangesAsync();
        return ServiceResult<CreateCourseResponse>.SuccessAsCreated(new CreateCourseResponse(course.Id), $"api/courses/{course.Id}");
    }

    public async Task<ServiceResult> UpdateAsync(int id, UpdateCourseRequest request)
    {
        var isCourseNameExist = await courseRepository.AnyAsync(x => x.Name == request.Name && x.Id != id);

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

