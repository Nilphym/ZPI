using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Data.Models;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.TestPlan.Responses;
using Funtest.TransferObject.TestPlan.Requests;

namespace Funtest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestPlansController : ControllerBase
    {
        private readonly ITestPlanService _testPlanService;
        private readonly ITestSuiteService _testSuiteService;
        private readonly ITestService _testService;
        private readonly IProductService _productService;

        public TestPlansController(ITestPlanService testPlanService, ITestSuiteService testSuiteService, ITestService testService,IProductService productService)
        {
            _testSuiteService = testSuiteService;
            _testPlanService = testPlanService;
            _productService = productService;
            _testService = testService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetTestPlanWithTestSuitesAndTestsResponse>> GetTestPlan(Guid id)
        {
            var testPlan = await _testPlanService.GetTestPlanWithTestSuiteAndTest(id);

            if (testPlan == null)
                return NotFound("Test plan with given id doesn't exist.");

            testPlan.TestSuites = _testSuiteService.GetTestSuiteForTestPlan(id);
            testPlan.Tests = _testService.GetTestsDataForTestPlan(id);
            return testPlan;
        }

        [HttpPost]
        public async Task<ActionResult> AddTestPlan(AddTestPlanRequest request)
        {
            var isProductExist = _productService.IsProductExist(request.ProductId);
            if (!isProductExist)
                return Conflict("Product with given id doesn't exist.");

            var result = await _testPlanService.AddTestPlan(request);

            if (result)
                return Ok();
            return Conflict("Problem with saving an object in the database");
        }
    }
}
