using Funtest.TransferObject.Test.Response;
using Funtest.TransferObject.TestSuite.Responses;
using System;
using System.Collections.Generic;

namespace Funtest.TransferObject.TestPlan.Responses
{
    public class GetTestPlanWithTestSuitesAndTestsResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<GetTestSuiteResponse> TestSuites { get; set; }
        public List<GetTestIdentityInformationResponse> Tests { get; set; }
    }
}
