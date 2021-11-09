using System;

namespace Funtest.TransferObject.Steps.Requests
{
    public class AddStepRequest
    {
        public string Name { get; set; }
        public Guid TestProcedureId { get; set; }
        public int StepNumber { get; set; }
    }
}
