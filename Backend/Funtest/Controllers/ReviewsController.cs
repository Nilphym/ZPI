using Data.Enums;
using Data.Roles;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.Review.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Funtest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ReviewsController : ControllerBase
    {
        private readonly IReviewService _reviewService;
        private readonly IErrorService _errorService;
        private readonly ITestService _testService;

        public ReviewsController(IReviewService reviewService, IErrorService errorService, ITestService testService)
        {
            _reviewService = reviewService;
            _testService = testService;
            _errorService = errorService;
        }

        [HttpPost("{errorId}")]
        [Authorize(Roles = Roles.Tester)]
        public async Task<ActionResult> AddReview([FromRoute] Guid errorId, AddReviewRequest request)
        {
            var principal = HttpContext.User;
            var testerId = principal.Claims.Where(x => x.Type == "userId").Select(x => x.Value).FirstOrDefault();

            var error = await _errorService.GetModelErrorById(errorId);
            if (error == null)
                return NotFound("Error with given Id doesn't exist.");

            if (error.ErrorState != ErrorState.Fixed && error.ErrorState != ErrorState.Retest)
                return Conflict($"You can not review error in state {error.ErrorState}.");

            if (error.ErrorState != ErrorState.Retest)
                await _errorService.ChangeErrorStatus(errorId, ErrorState.Retest);

            var result = await _reviewService.AddReview(request, errorId, testerId);
            result = result && await _reviewService.ResumeRetest(error);

            if (result)
                return Ok();

            return Conflict("Problem with saving object in database.");
        }
    }
}
