﻿using Data.Models;
using Funtest.TransferObject.Test.Requests;
using Funtest.TransferObject.Test.Response;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Funtest.Services.Interfaces
{
    public interface ITestService
    {
        Task<bool> AddTest(AddTestRequest test);
        Task<Test> FindTest(Guid id);
        Task<GetTestResponse> GetTestById(Guid id);
        Task<bool> EditTest(Guid id, EditTestRequest request);
        bool IsTestExist(Guid id);
        Task<int> GetExecutionCounterForTest(Guid id);
        List<GetTestBasicInformationResponse> GetAllTestsForTestPlan(Guid testPlanId);
        List<GetTestIdentityInformationResponse> GetTestsDataForTestSuite(Guid testSuiteId);
        List<GetTestIdentityInformationResponse> GetTestsDataForTestPlan(Guid testPlanId);
    }
}
