using Data.Models;
using Funtest.TransferObject.Review.Requests;
using System;
using System.Threading.Tasks;

namespace Funtest.Services.Interfaces
{
    public interface IReviewService
    {
        Task<bool> AddReview(AddReviewRequest request, Guid errorId, string testerId);
        Review GetActualReviewWriteByTester(Guid errorId, string testerId);
        Task<bool> ObsolteReviewsForError(Guid errorId);
        int CountFailedReviewsForError(Guid errorId);
        int CountReviewsForError(Guid errorId);
        Task<bool> ResumeRetest(Error error);
    }
}
