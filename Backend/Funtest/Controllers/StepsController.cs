using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Funtest.Interfaces;
using Funtest.TransferObject.Steps;
using System;
using Funtest.Services.Interfaces;

namespace Funtest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StepsController : ControllerBase
    {
        private readonly IStepService _stepService;
        private readonly ITestProcedureService _testProcedureService;

        public StepsController(IStepService stepService, ITestProcedureService testProcedureService)
        {
            _stepService = stepService;
            _testProcedureService = testProcedureService;
        }

        [HttpPost]
        public async Task<ActionResult> AddStep(StepsAddStep step)
        {
            var correctResult = await _stepService.AddStep(step);

            if (correctResult)
                return Ok(step);

            return Problem("Problem with saving an object in the database");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<StepsGetStep>>> GetSteps()
        {
            return Ok(_stepService.GetAllSteps());
        }

        [HttpGet("{testProcedureId}")]
        public async Task<ActionResult<IEnumerable<StepsGetStep>>> GetStepsForTestProcedure([FromRoute] Guid testProcedureId)
        {
            if (_testProcedureService.IsTestProcedureExist(testProcedureId))
                return Ok(_stepService.GetAllStepsForTestProcedure(testProcedureId));
            return NotFound("Test procedure with the given id doesn't exist.");
        }
    }
}
