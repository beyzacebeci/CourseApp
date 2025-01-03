using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using CourseApp.Application.Contracts.Persistence;
using CourseApp.Application.Features.BasketItems.Create;
using CourseApp.Application.Features.BasketItems.Dto;
using CourseApp.Application.Features.Baskets.Update;
using CourseApp.Domain.Entities;

namespace CourseApp.Application.Features.BasketItems
{
    public class BasketItemService(
    IBasketItemRepository basketRepository,
    IUnitOfWork unitOfWork,
    IMapper mapper) : IBasketItemService
    {
        public async Task<ServiceResult<List<BasketItemDto>>> GetAllListAsync()
        {
            var baskets = await basketRepository.GetAllAsync();

            var basketsDto = mapper.Map<List<BasketItemDto>>(baskets);

            return ServiceResult<List<BasketItemDto>>.Success(basketsDto);
        }

        public async Task<ServiceResult<BasketItemDto>> GetByIdAsync(int id)
        {
            var category = await basketRepository.GetByIdAsync(id);

            if (category is null)
            {
                return ServiceResult<BasketItemDto>.Fail("Category is not found", System.Net.HttpStatusCode.NotFound);
            }
            var categoryDto = mapper.Map<BasketItemDto>(category);
            return ServiceResult<BasketItemDto>.Success(categoryDto);
        }

        public async Task<ServiceResult<int>> CreateAsync(CreateBasketItemRequest request)

        {
            //var anyCategory = await basketRepository.AnyAsync(x => x.Name == request.Name);

            //if (anyCategory)
            //{
            //    return ServiceResult<int>.Fail("The same category name already exists in the database.",
            //        HttpStatusCode.NotFound);
            //}

            var newBasket = mapper.Map<BasketItem>(request);


            await basketRepository.AddAsync(newBasket);
            await unitOfWork.SaveChangesAsync();

            return ServiceResult<int>.SuccessAsCreated(newBasket.Id, $"api/categories/{newBasket.Id}");

        }

        public async Task<ServiceResult> UpdateAsync(int id, UpdateBasketRequest request)
        {
            //var isCategoryNameExist = await basketRepository.AnyAsync(x => x.Name == request.Name && x.Id != id);

            //if (isCategoryNameExist)
            //{
            //    return ServiceResult.Fail("The same category name already exists in the database.",
            //        HttpStatusCode.BadRequest);
            //}

            var basket = mapper.Map<BasketItem>(request);
            basket.Id = id;

            basketRepository.Update(basket);
            await unitOfWork.SaveChangesAsync();

            return ServiceResult.Success(HttpStatusCode.NoContent);

        }

        public async Task<ServiceResult> DeleteAsync(int id)
        {
            var basket = await basketRepository.GetByIdAsync(id);

            basketRepository.Delete(basket!);
            await unitOfWork.SaveChangesAsync();

            return ServiceResult.Success(HttpStatusCode.NoContent);
        }

    }

}