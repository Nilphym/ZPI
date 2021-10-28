using Funtest.Services.Interfaces;
using Funtest.TransferObject.TestSuite.Responses;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Funtest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestSuitesController : ControllerBase
    {
        private readonly ITestSuiteService _testSuiteService;
        private readonly ITestService _testService;

        public TestSuitesController(ITestSuiteService testSuiteService, ITestService testService)
        {
            _testSuiteService = testSuiteService;
            _testService = testService;
        }

        [HttpGet("{testSuiteId}/tests")]
        public async Task<ActionResult<GetTestSuiteWithTestsResponse>> GetTestSuiteWithTest(Guid testSuiteId)
        {
            var testSuite = await _testSuiteService.GetTestSuiteWithTests(testSuiteId);

            if (testSuite == null)
                return NotFound("Test suite with given id doesn't exist.");

            testSuite.Tests = _testService.GetTestsDataForTestSuite(testSuiteId);

            return Ok(testSuite);
        }
    }
}
