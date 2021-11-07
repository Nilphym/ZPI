using System;

namespace Funtest.TransferObject.TestCase.Requests
{
    public class AddTestCaseRequest
    {
        public Guid TestId { get; set; }
        public Guid ProductId { get; set; }
    }
}
