using Funtest.TransferObject.Error.Responses;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;

namespace Funtest.TransferObject.Steps.Responses
{
    public class GetStepWithErrorResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int StepNumber { get; set; }
        public JToken TestDataObject { get; set; }
        public string ControlPoint { get; set; }
        public List<GetIdentityErrorInformationRespons> Errors { get; set; }
    }
}
