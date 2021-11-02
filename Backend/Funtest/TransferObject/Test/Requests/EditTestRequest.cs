using System;

namespace Funtest.TransferObject.Test.Requests
{
    public class EditTestRequest
    {
        public string Name { get; set; }
        public Guid? TestProcedureId { get; set; }
        public Guid? TestCaseId { get; set; }
        public Guid? TestSuiteId { get; set; }
    }
}
