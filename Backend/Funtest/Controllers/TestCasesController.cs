using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Data.Models;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.TestCase.Requests;
using Funtest.TransferObject.TestCase.Responses;
using Data.Roles;
using Microsoft.AspNetCore.Authorization;

namespace Funtest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = Roles.Tester + ", " + Roles.Developer)]
    public class TestCasesController : ControllerBase
    {
        private readonly ITestCaseService _testCaseService;
        private readonly ITestService _testService;

        public TestCasesController(ITestCaseService testCaseService, ITestService testService)
        {
            _testCaseService = testCaseService;
            _testService = testService;
        }

        [HttpPost]
        public async Task<ActionResult<TestCase>> AddTestCase(AddTestCaseRequest testCase)
        {
            var response = await _testCaseService.AddTestCase(testCase);
            return response ? Ok() : Problem("Problem with saving an object in the database");
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetTestCaseResponse>> GetTestCase(Guid id)
        {
            var testCase = await _testCaseService.GetTestCaseById(id);
            return testCase == null ? NotFound("Test case with the given id doesn't exist.") : Ok(testCase);
        }

        [HttpPut("{testCaseId}")]
        public async Task<ActionResult> EditTestCase([FromRoute] Guid testCaseId, EditTestCaseRequest request)
        {
            var isExist = await _testCaseService.ExistTestCase(testCaseId);
            if (!isExist)
                return NotFound("Test case with the given id doesn't exist.");

            var isEditPossible = _testCaseService.IsEditPossible(testCaseId);

            bool result;
            if (isEditPossible)
                result = await _testCaseService.EditTestCase(testCaseId, request);
            else
            {
                var newTestCaseId = await _testCaseService.CreateNewTestCaseBaseOnExistTCWithModification(testCaseId, request);
                if (newTestCaseId == null)
                    result = false;
                else 
                    result = await _testService.AssignNewTestCase(request.TestId, (Guid)newTestCaseId);
            }

            if (!result)
                return Problem("Not saved! Problem during saving object in database!");
            return Ok();
        }
    }
}
