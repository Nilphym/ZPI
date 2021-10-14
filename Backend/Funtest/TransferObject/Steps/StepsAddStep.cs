using Newtonsoft.Json.Linq;
using System;

namespace Funtest.TransferObject.Steps
{
    public class StepsAddStep
    {
        public string Name { get; set; }
        public int StepNumber { get; set; }
        public JObject? TestData { get; set; }
        public string ControlPoint { get; set; }
        public Guid TestProcedureId { get; set; }
    }
}
