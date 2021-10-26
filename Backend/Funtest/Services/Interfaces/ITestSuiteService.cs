using Funtest.TransferObject.TestSuite.Responses;
using System;
using System.Collections.Generic;

namespace Funtest.Services.Interfaces
{
    public interface ITestSuiteService
    {
        List<GetTestSuiteResponse> GetAllTestSuites();
        bool IsTestSuiteExist(Guid id);
    }
}
