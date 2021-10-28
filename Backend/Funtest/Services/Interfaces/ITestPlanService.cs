using Funtest.TransferObject.TestPlan.Requests;
using Funtest.TransferObject.TestPlan.Responses;
using System;
using System.Threading.Tasks;

namespace Funtest.Services.Interfaces
{
    public interface ITestPlanService
    {
        Task<GetTestPlanWithTestSuitesAndTestsResponse> GetTestPlanWithTestSuiteAndTest(Guid testPlanId);
        Task<bool> AddTestPlan(AddTestPlanRequest request);
    }
}
