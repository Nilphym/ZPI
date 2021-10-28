﻿using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Data.Models;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.TestCase.Requests;
using Funtest.TransferObject.TestCase.Responses;

namespace Funtest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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

            var testExecutionCounter = await _testService.GetExecutionCounterForTest(request.TestId);
            if (testExecutionCounter > 0)
                return Conflict("Test case can't be modified.");

            var response = await _testCaseService.EditTestCase(testCaseId, request);
            if (!response)
                return Problem("Not saved! Problem during saving object in database!");

            return Ok();
        }
    }
}
