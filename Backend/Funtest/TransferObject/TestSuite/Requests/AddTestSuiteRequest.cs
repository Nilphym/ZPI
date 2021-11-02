using System;

namespace Funtest.TransferObject.TestSuite.Requests
{
    public class AddTestSuiteRequest
    {
        public Guid TestPlanId { get; set; }
        public string Category { get; set; }
    }
}
