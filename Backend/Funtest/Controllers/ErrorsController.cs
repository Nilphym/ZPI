using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Funtest.Services.Interfaces;
using Data.Roles;
using Microsoft.AspNetCore.Authorization;
using Funtest.TransferObject.Error.Requests;
using Funtest.TransferObject.Error.Responses;
using System.Collections.Generic;
using Data.Enums;

namespace Funtest.Controllers
{
    //[Authorize(AuthenticationSchemes = "Bearer")]
    [Route("api/[controller]")]
    [ApiController]
    public class ErrorsController : ControllerBase
    {
        private readonly IErrorService _errorService;
        private readonly IUserService _userService;

        public ErrorsController(IErrorService errorService, IUserService userService)
        {
            _errorService = errorService;
            _userService = userService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetErrorResponse>> GetError(Guid id)
        {
            var error = await _errorService.GetErrorById(id);

            if (error == null)
                return NotFound("Object with given id doesn't exist");

            return Ok(error);
        }

        [HttpGet()]
        public ActionResult<GetErrorResponse> GetAllErrors()
        {
            var errors = _errorService.GetAllErrors();
            return Ok(errors);
        }

       // [Authorize(Roles=Roles.Developer)]
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
            var errors = _errorService.GetAllErrorsToFix();
            return Ok(errors);
        }

        [HttpGet("toRetest")]
        public ActionResult<GetErrorResponse> GetAllErrorsToRetest()
        {
            var errors = _errorService.GetAllErrorsToRetest();
            return Ok(errors);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> EditError([FromRoute] Guid id, [FromBody] EditErrorRequest request)
        {
            var result = await _errorService.EditError(id, request);
            if(result)
                return Ok();
            return Problem("Problem with saving changes in database.");
        }

        [HttpPut("resolve/{id}")]
        public async Task<ActionResult> ResolveError([FromRoute] Guid id, [FromBody] ResolveErrorRequest request)
        {
            var isErrorExist = _errorService.IsErrorExist(id);
            if(!isErrorExist)
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
    }
}
