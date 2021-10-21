using Newtonsoft.Json.Linq;
using System;

namespace Funtest.TransferObject.Steps.Responses
{
    public class GetStepResponse
    {
        public Guid Id{ get; set; }
        public string Name { get; set; }
        public int StepNumber { get; set; }
        public JObject TestDataObject { get; set; }
        public string ControlPoint { get; set; }
    }
}
