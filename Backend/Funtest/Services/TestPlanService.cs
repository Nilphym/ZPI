using AutoMapper;
using Data.Models;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.TestPlan.Requests;
using Funtest.TransferObject.TestPlan.Responses;
using Funtest.TransferObject.TestSuite.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Funtest.Services
{
    public class TestPlanService : Service, ITestPlanService
    {
        private readonly IMapper _mapper;

        public TestPlanService(IServiceProvider service, IMapper mapper) : base(service)
        {
            _mapper = mapper;
        }

        public async Task<bool> AddTestPlan(Guid productId, AddTestPlanRequest request)
        {
            var testPlan = _mapper.Map<TestPlan>(request);
            testPlan.ProductId = productId;
            Context.TestPlans.Add(testPlan);

            if (await Context.SaveChangesAsync() == 0)
                return false;

            return true;
        }

        public async Task<bool> EditTestPlan(Guid id, EditTestPlanRequest request)
        {
            if (request.Name == "")
                return false;

            var testPlan = await Context.TestPlans.FindAsync(id);
            testPlan.Name = request.Name;
            Context.TestPlans.Update(testPlan);
            
            if (await Context.SaveChangesAsync() == 0)
                return false;

            return true;
        }

        public List<GetTestPlanIdentityValueResponse> GetAllTestPlansForProduct(Guid productId)
        {
            var testPlans = Context.TestPlans.Where(x => x.ProductId == productId).AsQueryable();
            return testPlans.Select(x => _mapper.Map<GetTestPlanIdentityValueResponse>(x)).ToList(); 
        }

        public async Task<GetTestPlanWithTestSuitesAndTestsResponse> GetTestPlanWithTestSuiteAndTest(Guid testPlanId)
        {
            var testPlan = await Context.TestPlans.FindAsync(testPlanId);
            if (testPlan == null)
                return null;

            return _mapper.Map<GetTestPlanWithTestSuitesAndTestsResponse>(testPlan);
        }

        public async Task<GetTestPlanForMaciejResponse> GetTestPlanWithTestSuiteAndTestForMaciej(Guid testPlanId)
        {
            var testPlan = _mapper.Map<GetTestPlanForMaciejResponse>(await Context.TestPlans.FindAsync(testPlanId));
             if (testPlan == null)
                 return null;

            testPlan.TestSuites = Context.TestSuites
                .Where(x => x.TestPlanId == testPlanId)
                .Select(x => _mapper.Map<GetTestSuiteWithTestsResponse>(x)).ToList();

            return testPlan;
        }

        public bool IsTestPlanExist(Guid testPlanId)
        {
            return Context.TestPlans.Any(x => x.Id == testPlanId);
        }
    }
}
