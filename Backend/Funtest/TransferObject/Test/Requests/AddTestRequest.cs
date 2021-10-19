using System;

namespace Funtest.TransferObject.Test.Requests
{
    public class AddTestRequest
    {


        public int Version { get; set; }

        public int ExecutionCounter { get; set; }
        public string Name { get; set; }

        public Guid? TestSuiteId { get; set; }
   
        public Guid? TestProcedureId { get; set; }

        public Guid? TestCaseId { get; set; }
    }
}
