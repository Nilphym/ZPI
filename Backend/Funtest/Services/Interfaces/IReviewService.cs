using Data.Models;
using Funtest.TransferObject.Review.Requests;
using System;
using System.Threading.Tasks;

namespace Funtest.Services.Interfaces
{
    public interface IReviewService
    {
        Task<bool> AddReview(AddReviewRequest request, Guid errorId, string testerId);
        Review GetActualReviewForTester(Guid errorId, string testerId);
        Task<bool> ChangeStatusToObsolteAsync(Guid reviewId);
        int CountFailedReviewsForError(Guid errorId);
        int CountReviewsForError(Guid errorId);
    }
}
