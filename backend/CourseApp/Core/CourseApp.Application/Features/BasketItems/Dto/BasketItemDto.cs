using CourseApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CourseApp.Application.Features.BasketItems.Dto;

public record BasketItemDto(
    int Id,
    int UserId,
    int CourseId,
    decimal TotalPrice,
    DateTime CreatedTime);