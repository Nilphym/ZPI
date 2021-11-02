using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.TestProcedure.Requests;
using Funtest.TransferObject.TestProcedure.Responses;
using Funtest.Interfaces;
using System.Linq;
using Data.Roles;
using Microsoft.AspNetCore.Authorization;

namespace Funtest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = Roles.Tester + ", " + Roles.Developer)]
    public class TestProceduresController : ControllerBase
    {
        private readonly ITestProcedureService _testProcedureService;
        private readonly IStepService _stepService;
        private readonly ITestService _testService;

        public TestProceduresController(ITestProcedureService testProcedureService, IStepService stepService, ITestService testService)
        {
            _testProcedureService = testProcedureService;
            _testService = testService;
            _stepService = stepService;
        }

        [HttpPost]
        public async Task<ActionResult> PostTestProcedure(AddTestProcedureRequest testProcedure)
        {
            var correctResult = await _testProcedureService.AddTestProcedure(testProcedure);

            if (correctResult)
                return Ok();

            return Problem("Problem with saving an object in the database");
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetTestProcedureResponse>> GetTestProcedure(Guid id)
        {
            var testProcedure = await _testProcedureService.GetTestProcedureById(id);
            if (testProcedure == null)
            {
                return NotFound("Object with the given id doesn't exist.");
            }
            testProcedure.StepIds = _stepService.GetAllStepsForTestProcedure(id).Select(x => x.Id).ToList();

            return Ok(testProcedure);
        }

        [HttpPut("{id}") ]
        public async Task<ActionResult> EditTestProcedure([FromRoute] Guid id, EditTestProcedureRequest request)
        {
            var isExist = _testProcedureService.IsTestProcedureExist(id);
            if (!isExist)
                return NotFound("Object with the given id doesn't exist.");

            var testExecutionCounter = await _testService.GetExecutionCounterForTest(request.TestId);
            if (testExecutionCounter > 0)
                return Conflict("Test procedura can't be modified.");

            var result = await _testProcedureService.EditTestProcedure(id, request);
            if (result)
                return Ok();
            return Problem("Problem with saving an object in the database");
        }
    }
}
