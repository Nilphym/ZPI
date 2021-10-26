using System;

namespace Funtest.TransferObject.TestProcedure.Requests
{
    public class AddTestProcedureRequest
    {
        public string Result { get; set; }

        public Guid? TestCaseId { get; set; }
    }
}
