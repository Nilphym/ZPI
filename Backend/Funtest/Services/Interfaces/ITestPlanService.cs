using Funtest.TransferObject.TestPlan.Requests;
using Funtest.TransferObject.TestPlan.Responses;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Funtest.Services.Interfaces
{
    public interface ITestPlanService
    {
        Task<GetTestPlanWithTestSuitesAndTestsResponse> GetTestPlanWithTestSuiteAndTest(Guid testPlanId);
        Task<bool> AddTestPlan(Guid productId, AddTestPlanRequest request);
        bool IsTestPlanExist(Guid testPlanId);
        Task<bool> EditTestPlan(Guid id, EditTestPlanRequest request);

        List<GetTestPlanIdentityValueResponse> GetAllTestPlansForProduct(Guid productId);
    }
}
