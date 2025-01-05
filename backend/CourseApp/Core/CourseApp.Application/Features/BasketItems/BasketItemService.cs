using AutoMapper;
using CourseApp.Application.Contracts.Persistence;
using CourseApp.Application.Features.BasketItems.Create;
using CourseApp.Application.Features.BasketItems.Dto;
using CourseApp.Application.Features.Baskets.Update;
using CourseApp.Domain.Entities;
using System.Net;

namespace CourseApp.Application.Features.BasketItems
{
    public class BasketItemService(
    IBasketItemRepository basketRepository,
    IUnitOfWork unitOfWork,
    IMapper mapper) : IBasketItemService
    {

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
            var existingBasketItem = await basketRepository.AnyAsync(x =>
                x.CourseId == request.CourseId &&
                x.UserId == request.UserId);

            if (existingBasketItem)
            {
                return ServiceResult<int>.Fail(
                    "This course is already in your basket.",
                    HttpStatusCode.BadRequest);
            }

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

        public async Task<ServiceResult<List<BasketItemDto>>> GetAllByUserIdAsync(int userId)
        {
            var baskets = await basketRepository.GetAllByUserIdAsync(userId);
            var basketsDto = mapper.Map<List<BasketItemDto>>(baskets);
            return ServiceResult<List<BasketItemDto>>.Success(basketsDto);
        }
        public async Task<ServiceResult> DeleteAllAsync(int userId)
        {
            await basketRepository.DeleteAllAsync(userId);
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