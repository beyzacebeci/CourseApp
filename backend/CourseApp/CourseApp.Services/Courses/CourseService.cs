﻿using AutoMapper;
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

public class CourseService(ICourseRepository courseRepository,
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
            return ServiceResult<CourseDto?>.Fail("Course not found", HttpStatusCode.NotFound);
        }

        var courseDto = mapper.Map<CourseDto>(course);


        return ServiceResult<CourseDto>.Success(courseDto)!;

    }

    public async Task<ServiceResult<CreateCourseResponse>> CreateAsync(CreateCourseRequest request)
    {
        //async manuel service businnes check
        var anyProduct = await courseRepository.Where(x => x.Name == request.Name).AnyAsync();

        if (anyProduct)
        {
            return ServiceResult<CreateCourseResponse>.Fail("kurs ismi veritabanında bulunmaktadır.",
                HttpStatusCode.NotFound);
        }

         
        var course = new Course()
        {
            Name = request.Name,
            Description = request.Description,
            Price = request.Price
        };
        await courseRepository.AddAsync(course);
        await unitOfWork.SaveChangesAsync();
        return ServiceResult<CreateCourseResponse>.SuccessAsCreated(new CreateCourseResponse(course.Id),$"api/courses/{course.Id}");
    }

    public async Task<ServiceResult> UpdateAsync(int id, UpdateCourseRequest request)
    {
        var course = await courseRepository.GetByIdAsync(id);
        if(course is null)
        {
            return ServiceResult.Fail("Course not found",HttpStatusCode.NotFound);
        }
        
        course.Name = request.Name;
        course.Description = request.Description;
        course.Price = request.Price;

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
        if (course is null)
        {
            return ServiceResult.Fail("Course not found", HttpStatusCode.NotFound);
        }

        courseRepository.Delete(course);
        await unitOfWork.SaveChangesAsync();
        return ServiceResult.Success(HttpStatusCode.NoContent);     
    }

}

