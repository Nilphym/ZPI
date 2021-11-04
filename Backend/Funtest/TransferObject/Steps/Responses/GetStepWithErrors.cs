using System;
using System.Collections.Generic;

namespace Funtest.TransferObject.Steps.Responses
{
    public class GetStepWithErrors
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int StepNumber { get; set; }
        public string TestData { get; set; }
        public string ControlPoint { get; set; }
        public List<Guid> ErrorIds { get; set; }
    }
}
