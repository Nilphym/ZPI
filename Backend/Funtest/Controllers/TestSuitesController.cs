using Data.Roles;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.TestSuite.Requests;
using Funtest.TransferObject.TestSuite.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Funtest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = Roles.Tester+", "+ Roles.Developer + ", "+Roles.ProjectManager)]
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

            testSuite.TestsForTestSuite = _testService.GetTestsDataForTestSuite(testSuiteId);

            return Ok(testSuite);
        }

        [HttpPost]
        [Authorize(Roles = Roles.Tester)]
        public async Task<ActionResult> AddTestSuite(AddTestSuiteRequest request)
        {
            var result = await _testSuiteService.AddTestSuite(request);

            if (result)
                return Ok();
            return Conflict("Problem with saving data in database");
        } 

        [HttpPut("{id}")]
        [Authorize(Roles = Roles.Tester)]
        public async Task<ActionResult> EditTestSuite([FromRoute] Guid id, EditTestSuiteRequest request)
        {
            var result = await  _testSuiteService.EditTestSuite(id, request);

            if (result)
                return Ok();
            return Conflict("Problem with updating object");
        }
    }
}
