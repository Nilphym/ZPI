using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.Error.Requests;
using Funtest.TransferObject.Error.Responses;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Data.Roles;
using Funtest.Interfaces;
using Funtest.TransferObject.Error.Response;
using System.Net.Http.Headers;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

namespace Funtest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = Roles.Tester + ", " + Roles.Developer)]
    public class ErrorsController : ControllerBase
    {
        private readonly IErrorService _errorService;
        private readonly IUserService _userService;
        private readonly ITestService _testService;
        private readonly IStepService _stepService;

        public ErrorsController(IErrorService errorService, IUserService userService, ITestService testService, IStepService stepService)
        {
            _errorService = errorService;
            _userService = userService;
            _testService = testService;
            _stepService = stepService;
        }

        [HttpPost]
        public async Task<ActionResult> AddError(AddErrorRequest request)
        {
            if (!await _userService.IsTesterExist(request.TesterId))
                return NotFound("Tester with given id doesn't exist.");

            var test = await _testService.FindTest(request.TestId);
            if (test == null)
                return NotFound("Test with given id doesn't exist.");

            if (!_stepService.IsStepExist(request.StepId))
                return NotFound("Step with given id doesn't exist.");

            var result = await _errorService.AddError(request, test.TestSuite.Category);
            if (result)
                return Ok();
            return Problem("Problem with saving changes in database.");
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetErrorResponse>> GetError(Guid id)
        {
            var error = await _errorService.GetErrorById(id);

            if (error == null)
                return NotFound("Object with given id doesn't exist");

            return Ok(error);
        }

        [HttpGet("/api/Project/{productId}/[controller]")]
        public ActionResult<GetErrorResponse> GetAllErrors([FromRoute] Guid productId)
        {
            var errors = _errorService.GetAllErrors(productId);
            return Ok(errors);
        }

        [Authorize(Roles = Roles.Developer)]
        [HttpGet("developer/{developerId}")]
        public async Task<ActionResult<GetErrorResponse>> GetAllErrorsAssignedToDeveloper([FromRoute] string developerId)
        {
            var isUserExist = await _userService.IsUserExist(developerId);
            if (!isUserExist)
                return NotFound("User with given id doesn't exist.");

            var errors = _errorService.GetAllErrorsAssignedToDeveloper(developerId);
            return Ok(errors);
        }

        [HttpGet("toFix")]
        public ActionResult<GetErrorResponse> GetAllErrorsToFix()
        {
            var principal = HttpContext.User;
            var productId = Guid.Parse(principal.Claims.Where(x => x.Type == "productId").Select(x => x.Value).FirstOrDefault());

            var errors = _errorService.GetAllErrorsToFix(productId);
            return Ok(errors);
        }

        [HttpGet("toRetest")]
        public ActionResult<GetErrorResponse> GetAllErrorsToRetest()
        {
            var principal = HttpContext.User;
            var productId = Guid.Parse(principal.Claims.Where(x => x.Type == "productId").Select(x => x.Value).FirstOrDefault());

            var errors = _errorService.GetAllErrorsToRetest(productId);
            return Ok(errors);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> EditError([FromRoute] Guid id, [FromBody] EditErrorRequest request)
        {
            var result = await _errorService.EditError(id, request);
            if (result)
                return Ok();
            return Problem("Problem with saving changes in database.");
        }

        [HttpPut("closed/{id}")]
        public async Task<ActionResult> ResolveError([FromRoute] Guid id, [FromBody] ResolveErrorRequest request)
        {
            var isErrorExist = _errorService.IsErrorExist(id);
            if (!isErrorExist)
                return NotFound("Object with given id doesn't exist");

            var result = await _errorService.ResolveError(id, request);
            if (result)
                return Ok();
            return Problem("Problem with saving changes in database.");
        }

        [HttpGet("ErrorPriorities")]
        public ActionResult<List<string>> GetErrorPriorities()
        {
            return _errorService.ErrorPriorities();
        }

        [HttpGet("ErrorImpacts")]
        public ActionResult<List<string>> GetErrorImpacts()
        {
            return _errorService.ErrorImpacts();
        }

        [HttpGet("ErrorStates")]
        public ActionResult<List<string>> GetErrorStates()
        {
            return _errorService.ErrorStates();
        }

        [HttpGet("ErrorTypes")]
        public ActionResult<List<string>> GetErrorTypes()
        {
            return _errorService.ErrorTypes();
        }

        [HttpPut("open/{errorId}")]
        public async Task<ActionResult> AssignBugToDeveloper([FromRoute] Guid errorId, [FromBody] DeveloperAssignedToErrorRequest request)
        {
            var isErrorExist = _errorService.IsErrorExist(errorId);
            if (!isErrorExist)
                return NotFound("Error with given id doesn't exist");
            var notAssigned = await _errorService.IsErrorNotAssigned(errorId);

            if (!notAssigned)
                return Conflict("Someone is working on this error.");

            var isDeveloperExist = await _userService.IsDeveloperExist(request.DeveloperId);
            if (!isDeveloperExist)
                return NotFound("Developer with given id doesn't exist");

            var result = await _errorService.AssignBugToDeveloper(errorId, request);
            if (result)
                return Ok();
            return Problem("Problem with saving changes in database.");
        }

        [HttpPut("reject/{errorId}")]
        public async Task<ActionResult> RejectError([FromRoute] Guid errorId, DeveloperAssignedToErrorRequest request)
        {
            var result = await _errorService.RejectError(errorId, request);

            if (result)
                return Ok();
            return Conflict("An error has occurred.");
        }

        [HttpPut("resign/{errorId}")]
        public async Task<ActionResult> ResignTheError([FromRoute] Guid errorId, DeveloperAssignedToErrorRequest request)
        {
            var result = await _errorService.ResignError(errorId, request);

            if (result)
                return Ok();
            return Conflict("An error has occurred.");
        }

        [HttpGet("ErrorTest/{errorId}")]
        public async Task<ActionResult<ErrorTestResponse>> GetErrorTest([FromRoute] Guid errorId)
        {
            if (!_errorService.IsErrorExist(errorId))
                return NotFound("Error with givenn id doesn't exist");

            var errorTest = await _errorService.GetErrorTest(errorId);
            errorTest.Steps = await _stepService.GetStepsWithErrorsForTest(errorTest.TestId);

            return errorTest;
        }
    }
}