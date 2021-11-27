using Funtest.TransferObject.TestSuite.Responses;
using System;
using System.Collections.Generic;

namespace Funtest.TransferObject.TestPlan.Responses
{
    public class GetTestPlanForMaciejResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<GetTestSuiteWithTestsResponse> TestSuites { get; set; }
    }
}
