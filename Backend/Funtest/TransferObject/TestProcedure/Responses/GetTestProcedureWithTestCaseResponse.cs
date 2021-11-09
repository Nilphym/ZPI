using System;
    
namespace Funtest.TransferObject.TestProcedure.Responses
{
    public class GetTestProcedureWithTestCaseResponse
    {
        public Guid Id { get; set; }
        public string Code { get; set; }
        public Guid TestCaseId { get; set; }
    }
}
