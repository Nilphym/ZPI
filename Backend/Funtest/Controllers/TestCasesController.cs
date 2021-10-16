using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Data.Models;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.TestCase.Requests;

namespace Funtest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestCasesController : ControllerBase
    {
        private readonly ITestCaseService _testCaseService;

        public TestCasesController(ITestCaseService testCaseService)
        {
            _testCaseService = testCaseService;
        }

        [HttpPost]
        public async Task<ActionResult<TestCase>> PostTestCase(AddTestCaseRequest testCase)
        {
            var response = await _testCaseService.AddTestCase(testCase);
            return response ? Ok() : Problem("Problem with saving an object in the database");
        }

        // GET: api/TestCases/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TestCase>> GetTestCase(Guid id)
        {
            var testCase = await _testCaseService.GetTestCaseById(id);
            return testCase == null ? NotFound("Test case with the given id doesn't exist.") : Ok(testCase);
        } 
    }
}
