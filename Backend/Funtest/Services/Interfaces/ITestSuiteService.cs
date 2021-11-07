using Funtest.TransferObject.TestSuite.Requests;
using Funtest.TransferObject.TestSuite.Responses;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Funtest.Services.Interfaces
{
    public interface ITestSuiteService
    {
        List<GetTestSuiteResponse> GetAllTestSuitesForProduct(Guid productId);
        Task<bool> AddTestSuite(AddTestSuiteRequest request);
        bool IsTestSuiteExist(Guid id);
        Task<bool> EditTestSuite(Guid id, EditTestSuiteRequest request);
        Task<GetTestSuiteWithTestsResponse> GetTestSuiteWithTests(Guid id);
        List<GetTestSuiteResponse> GetTestSuiteForTestPlan(Guid testPlanId);
    }
}
