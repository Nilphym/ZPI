using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Data.Models;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.Test.Requests;
using System;
using Funtest.TransferObject.Test.Response;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Data.Roles;
using System.Linq;

namespace Funtest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = Roles.Tester + ", " + Roles.Developer)]
    public class TestsController : ControllerBase
    {
        private readonly ITestService _testService;
        private readonly ITestCaseService _testCaseService;
        private readonly ITestSuiteService _testSuitService;
        private readonly ITestPlanService _testPlanService;
        private readonly ITestProcedureService _testProcedureService;

        public TestsController(ITestPlanService testPlanService, ITestService testService, ITestProcedureService testProcedureService, ITestCaseService testCaseService, ITestSuiteService testSuiteService)
        {
            _testService = testService;
            _testPlanService = testPlanService;
            _testCaseService = testCaseService;
            _testSuitService = testSuiteService;
            _testProcedureService = testProcedureService;
        }

        [HttpPost]
        public async Task<ActionResult> AddTest(AddTestRequest test)
        {
            var isPlanTestExist = _testPlanService.IsTestPlanExist(test.PlanTestId);
            if (!isPlanTestExist)
                return Conflict("Test plan with given id doesn't exist.");

            var isTestSuiteExist = _testSuitService.IsTestSuiteExist(test.PlanSuiteId);
            if (!isTestSuiteExist)
                return NotFound("Test suite with given id doesn't exist.");

            var response = await _testService.AddTest(test);
            if (response)
                return Ok();

            return Problem("Problem with saving an object in the database");
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetTestResponse>> GetTest(Guid id)
        {
            var isTestExist = _testService.IsTestExist(id);
            if (!isTestExist)
                return NotFound("Test with given id doesn't exist.");

            var principal = HttpContext.User;
            var productId = Guid.Parse(principal.Claims.Where(x => x.Type == "productId")
                                .Select(x => x.Value)
                                .FirstOrDefault());

            var response = await _testService.GetTestById(id);

            response.TestProcedures = _testProcedureService.GetAllTestProceduresForProduct(productId);
            response.TestCases = _testCaseService.GetAllTestCasesForProduct(productId);
            response.TestSuites = _testSuitService.GetAllTestSuitesForProduct(productId);
            return Ok(response);
        }

        [HttpPut("{testId}")]
        public async Task<ActionResult> EditTest([FromRoute] Guid testId, EditTestRequest request)
        {
            var isExist = _testService.IsTestExist(testId);
            if (!isExist)
                return NotFound("Object with given id doesn't exist");

            var testExecutionCounter = await _testService.GetExecutionCounterForTest(testId);
            if (testExecutionCounter > 0)
                return Conflict("Test can't be modified.");

            var result = await _testService.EditTest(testId, request);
            if (result)
                return Ok();

            return Problem("Problem with saving an object in the database");
        }

        [HttpGet("/api/TestPlan/{testPlanId}/[controller]")]
        public ActionResult<List<GetTestBasicInformationResponse>> GetAllTestsForTestPlan([FromRoute] Guid testPlanId)
        {
            var isTestPlanExist = _testPlanService.IsTestPlanExist(testPlanId);
            if (!isTestPlanExist)
                return NotFound("Test plan with given id doesn't exist.");

            var result = _testService.GetAllTestsForTestPlan(testPlanId);
            return Ok(result);
        }

        [HttpPut("{testId}/execute")]
        public async Task<ActionResult> ExecuteTest([FromRoute] Guid testId)
        {
            var result = await _testService.ExecuteTest(testId);

            if (!result)
                return NotFound("Test plan with given id doesn't exist.");

            return Ok();
        }

        [HttpGet("{testId}/executionCounter")]
        public async Task<ActionResult<int>> GetTestExecutionCounter([FromRoute] Guid testId)
        {
            var isTestExist = _testService.IsTestExist(testId);

            if (!isTestExist)
                return NotFound("Test with given id doesn't exist.");

            return await _testService.GetExecutionCounterForTest(testId);
        }
    }
}
