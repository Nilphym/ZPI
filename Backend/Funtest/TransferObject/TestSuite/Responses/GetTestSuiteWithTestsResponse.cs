using Funtest.TransferObject.Test.Response;
using System;
using System.Collections.Generic;

namespace Funtest.TransferObject.TestSuite.Responses
{
    public class GetTestSuiteWithTestsResponse
    {
        public Guid Id { get; set; }

        public string Category { get; set; }
        
        public List<GetTestIdentityInformationResponse> TestsForTestSuite { get; set; }
    }
}
