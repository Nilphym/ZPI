using AutoMapper;
using Data.Models;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.Review.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Funtest.Services
{
    public class ReviewService : Service, IReviewService
    {
        private readonly IMapper _mapper;

        public ReviewService(IServiceProvider serviceProvider, IMapper mapper) : base(serviceProvider)
        {
            _mapper = mapper;
        }

        public async Task<bool> AddReview(AddReviewRequest request, Guid errorId, string testerId)
        {
            var review = _mapper.Map<Review>(request);
            review.PublishDate = DateTime.Now;
            review.ErrorId = errorId;
            review.TesterId = testerId;
            review.IsActual = true;
            Context.Reviews.Add(review);

            if (await Context.SaveChangesAsync() == 0)
                return false;

            return true;
        }

        public async Task<bool> ChangeStatusToObsolteAsync(Guid errorId)
        {
            var review = await Context.Reviews.FindAsync(errorId);
            review.IsActual = false;

            if (await Context.SaveChangesAsync() == 0)
                return false;

            return true;
        }

        public int CountFailedReviewsForError(Guid errorId)
        {
            return Context.Reviews.Where(x => x.ErrorId == errorId && x.IsActual && !x.Result).Count();
        }

        public int CountReviewsForError(Guid errorId)
        {
            return Context.Reviews.Where(x => x.ErrorId == errorId && x.IsActual).Count();
        }

        public Review GetActualReviewForTester(Guid errorId, string testerId)
        {
            return Context.Reviews.Where(x => x.ErrorId == errorId && x.TesterId == testerId && x.IsActual).FirstOrDefault();
        }
    }
}
