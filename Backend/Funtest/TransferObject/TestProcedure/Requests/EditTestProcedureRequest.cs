using System;

namespace Funtest.TransferObject.TestProcedure.Requests
{
    public class EditTestProcedureRequest
    {
        public Guid TestId { get; set; }
        public string Result { get; set; }
    }
}
