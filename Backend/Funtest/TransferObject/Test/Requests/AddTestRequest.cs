using System;

namespace Funtest.TransferObject.Test.Requests
{
    public class AddTestRequest
    {
        public Guid PlanTestId { get; set; }
        public Guid PlanSuiteId { get; set; }
        public string Name { get; set; }
    }
}
