using AutoMapper;
using Data.Models;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.Review.Requests;
using System;
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
            Context.Reviews.Update(review);

            if (await Context.SaveChangesAsync() == 0)
                return false;

            return true;
        }

        public async Task<bool> ObsolteReviewsForError(Guid errorId)
        {
            var reviews = Context.Reviews.Where(x => x.ErrorId == errorId && x.IsActual).ToList();
            foreach (var review in reviews)
            {
                review.IsActual = false;
                if (await Context.SaveChangesAsync() == 0)
                    return false;
            }
            return true;
        }

        public int CountFailedReviewsForError(Guid errorId)
        {
            return Context.Reviews.Where(x => x.ErrorId == errorId && x.IsActual && !x.Result).Count();
        }

        //zmienić nazwę na activereviews
        public int CountReviewsForError(Guid errorId)
        {
            return Context.Reviews.Where(x => x.ErrorId == errorId && x.IsActual).Count();
        }

        public Review GetActualReviewWriteByTester(Guid errorId, string testerId)
        {
            return Context.Reviews.Where(x => x.ErrorId == errorId && x.TesterId == testerId && x.IsActual).FirstOrDefault();
        }

        public async Task<bool> ResumeRetest(Error error)
        {
            var allReviews = CountReviewsForError(error.Id);

            if (error.RetestsRequired == allReviews)
            {
                var failedReviews = CountFailedReviewsForError(error.Id);
                if (failedReviews > allReviews - failedReviews)
                {
                    error.ErrorState = Data.Enums.ErrorState.Reopened;
                    await ObsolteReviewsForError(error.Id);

                    var user = await Context.Users.FindAsync(error.DeveloperId);
                    if (user.IsDeleted)
                    {
                        error.ErrorState = Data.Enums.ErrorState.New;
                        error.DeveloperId = null;
                    }
                }
                else
                    error.ErrorState = Data.Enums.ErrorState.Closed;
                    
                Context.Errors.Update(error);
                if (await Context.SaveChangesAsync() == 0)
                    return false;
                else
                    return true;
            }
            return true;
        }
    }
}
