using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.TestPlan.Responses;
using Funtest.TransferObject.TestPlan.Requests;
using Microsoft.AspNetCore.Authorization;
using Data.Roles;
using Funtest.TransferObject.TestSuite.Responses;

namespace Funtest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = Roles.Tester + ", " + Roles.Developer + ", " + Roles.ProjectManager)]
    public class TestPlansController : ControllerBase
    {
        private readonly ITestPlanService _testPlanService;
        private readonly ITestSuiteService _testSuiteService;
        private readonly ITestService _testService;
        private readonly IProductService _productService;

        public TestPlansController(ITestPlanService testPlanService, ITestSuiteService testSuiteService, ITestService testService, IProductService productService)
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

        [HttpPost("/api/{productId}/[controller]")]
        [Authorize(Roles = Roles.Tester)]
        public async Task<ActionResult> AddTestPlan([FromRoute] Guid productId, AddTestPlanRequest request)
        {
            var isProductExist = _productService.IsProductExist(productId);
            if (!isProductExist)
                return Conflict("Product with given id doesn't exist.");

            var result = await _testPlanService.AddTestPlan(productId, request);

            if (result)
                return Ok();
            return Conflict("Problem with saving an object in the database");
        }


        [HttpPut("{testPlanId}")]
        [Authorize(Roles = Roles.Tester)]
        public async Task<ActionResult> EditTestPlan([FromRoute] Guid testPlanId, EditTestPlanRequest request)
        {
            var isTestPlanExist = _testPlanService.IsTestPlanExist(testPlanId);
            if (!isTestPlanExist)
                return NotFound("Test plan with given id doesn't exist");

            var result = await _testPlanService.EditTestPlan(testPlanId, request);
            if (result)
                return Ok();
            return Conflict("Problem with saving an object in the database");
        }

        [HttpGet("/api/Product/{productId}/[controller]")]
        public ActionResult<List<GetTestPlanIdentityValueResponse>> GetAllTestPlanForProduct([FromRoute] Guid productId)
        {
            var isProductExist = _productService.IsProductExist(productId);
            if (!isProductExist)
                return Conflict("Product with given id doesn't exist.");

            var result = _testPlanService.GetAllTestPlansForProduct(productId);
            return Ok(result);
        }


        [HttpGet("maciej/{id}")]
        public async Task<ActionResult<GetTestPlanForMaciejResponse>> GetTestPlanForMaciej(
          Guid id)
        {
            TestPlansController testPlansController = this;
            GetTestPlanForMaciejResponse testPlan = await testPlansController._testPlanService.GetTestPlanWithTestSuiteAndTestForMaciej(id);
            List<GetTestSuiteResponse> suiteForTestPlan = testPlansController._testSuiteService.GetTestSuiteForTestPlan(id);
            if (testPlan == null)
                return (ActionResult<GetTestPlanForMaciejResponse>)(ActionResult)testPlansController.NotFound((object)"Test plan with given id doesn't exist.");
            testPlan.TestSuites = new List<GetTestSuiteWithTestsResponse>();
            foreach (GetTestSuiteResponse testSuite in suiteForTestPlan)
            {
                GetTestSuiteWithTestsResponse testSuiteWithTests = await testPlansController._testSuiteService.GetTestSuiteWithTests(testSuite.Id);
                testSuiteWithTests.TestsForTestSuite = testPlansController._testService.GetTestsDataForTestSuite(testSuite.Id);
                testPlan.TestSuites.Add(testSuiteWithTests);
            }
            return (ActionResult<GetTestPlanForMaciejResponse>)testPlan;
        }
    }
}
