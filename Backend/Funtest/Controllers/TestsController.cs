using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Data.Models;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.Test.Requests;
using System;
using Funtest.TransferObject.Test.Response;

namespace Funtest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestsController : ControllerBase
    {
        private readonly ITestService _testService;
        private readonly ITestCaseService _testCaseService;
        private readonly ITestSuiteService _testSuitService;
        private readonly ITestProcedureService _testProcedureService;

        public TestsController(ITestService testService, ITestProcedureService testProcedureService, ITestCaseService testCaseService, ITestSuiteService testSuiteService)
        {
            _testService = testService;
            _testCaseService = testCaseService;
            _testSuitService = testSuiteService;
            _testProcedureService = testProcedureService;
        }

        [HttpPost]
        public async Task<ActionResult> AddTest(AddTestRequest test)
        {
            var response = await _testService.AddTest(test);
            if (response)
                return Ok();

            return Problem("Problem with saving an object in the database");
        }

        //sprawdzić czy to dobrze mapuje selected identity
        [HttpGet("{id}")]
        public async Task<ActionResult<GetTestResponse>> GetTest(Guid id)
        {
            var response = await _testService.GetTestById(id);
            response.TestProcedures = _testProcedureService.GetAllTestProcedures();
            response.TestCases = _testCaseService.GetAllTestCases();
            response.TestSuites = _testSuitService.GetAllTestSuites();
            return Ok(response);
        }

        [HttpPut("{testId}")]
        public async Task<ActionResult> EditTest([FromRoute] Guid id, EditTestRequest request)
        {
            var result = await _testService.EditTest(id, request);

            if (result)
                return Ok();

            return Problem("Problem with saving an object in the database");
        }
    }
}
