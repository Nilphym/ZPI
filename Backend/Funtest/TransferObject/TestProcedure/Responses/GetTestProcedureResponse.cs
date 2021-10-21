using System;
using System.Collections.Generic;

namespace Funtest.TransferObject.TestProcedure.Responses
{
    public class GetTestProcedureResponse
    {
        public string Result { get; set; }
        public string Code { get; set; }
        public Guid TestCaseId { get; set; }
        public List<Guid> StepIds { get; set; }
    }
}
