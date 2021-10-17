using System;

namespace Funtest.TransferObject.TestProcedure.Requests
{
    public class AddTestProcedureRequest
    {
        public Guid? Id { get; set; }

        public string Result { get; set; }

        public Guid? TestCaseId { get; set; }
    }
}
