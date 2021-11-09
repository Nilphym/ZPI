using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Funtest.Interfaces;
using System;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.Steps.Requests;
using Funtest.TransferObject.Steps.Responses;
using Microsoft.AspNetCore.Authorization;
using Data.Roles;

namespace Funtest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = Roles.Tester + ", " + Roles.Developer)]
    public class StepsController : ControllerBase
    {
        private readonly IStepService _stepService;
        private readonly IErrorService _errorService;
        private readonly ITestProcedureService _testProcedureService;

        public StepsController(IStepService stepService, IErrorService errorService, ITestProcedureService testProcedureService)
        {
            _stepService = stepService;
            _errorService = errorService;
            _testProcedureService = testProcedureService;
        }

        [HttpPost]
        public async Task<ActionResult> AddStep(AddStepRequest step)
        {
            var isTetProcedureExist = _testProcedureService.IsTestProcedureExist(step.TestProcedureId);

            if (!isTetProcedureExist)
                return NotFound("Test procedured doesn't exist.");

            var correctResult = await _stepService.AddStep(step);

            if (correctResult)
                return Ok(step);

            return Problem("Problem with saving an object in the database");
        }

        [HttpGet]
        public ActionResult<IEnumerable<GetStepResponse>> GetSteps()
        {
            return Ok(_stepService.GetAllSteps());
        }

        [HttpGet("{stepId}")]
        public async Task<ActionResult<GetStepResponse>> GetStep([FromRoute] Guid stepId)
        {
            var step = await _stepService.GetStep(stepId);
            return step != null ? Ok(step) : NotFound();
        }

        [HttpGet("testprocedure/{testProcedureId}")]
        public ActionResult<IEnumerable<GetStepWithErrorResponse>> GetStepsForTestProcedureAsync([FromRoute] Guid testProcedureId)
        {
            if (!_testProcedureService.IsTestProcedureExist(testProcedureId))
                return NotFound("Test procedure with the given id doesn't exist.");

            var steps = _stepService.GetAllStepsForTestProcedure(testProcedureId);
            foreach (var step in steps)
                step.Errors = _errorService.GetAllErrorsForStep(step.Id);

            return Ok(steps);
        }

        [HttpPut("{stepId}")]
        public async Task<ActionResult> EditStep([FromRoute] Guid stepId, EditStepRequest request)
        {
            var response = await _stepService.EditStep(stepId, request);

            if (!response)
                return Problem("Not saved! Problem during saving object in database!");

            return Ok();
        }
    }
}
