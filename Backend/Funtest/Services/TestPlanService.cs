using AutoMapper;
using Data.Models;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.TestPlan.Requests;
using Funtest.TransferObject.TestPlan.Responses;
using System;
using System.Threading.Tasks;

namespace Funtest.Services
{
    public class TestPlanService : Service, ITestPlanService
    {
        private readonly IMapper _mapper;

        public TestPlanService(IServiceProvider service, IMapper mapper): base(service)
        {
            _mapper = mapper;
        }

        public async Task<bool> AddTestPlan(AddTestPlanRequest request)
        {
            var testPlan = _mapper.Map<TestPlan>(request);
            Context.TestPlans.Add(testPlan);

            if (await Context.SaveChangesAsync() == 0)
                return false;

            return true;
        }

        public async Task<GetTestPlanWithTestSuitesAndTestsResponse> GetTestPlanWithTestSuiteAndTest(Guid testPlanId)
        {
            var testPlan = await Context.TestPlans.FindAsync(testPlanId);
            if (testPlan == null)
                return null;

            return _mapper.Map<GetTestPlanWithTestSuitesAndTestsResponse>(testPlan);
        }
    }
}
