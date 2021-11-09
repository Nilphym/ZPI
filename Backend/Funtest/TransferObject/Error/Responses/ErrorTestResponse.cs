using Funtest.TransferObject.Steps.Responses;
using System;
using System.Collections.Generic;

namespace Funtest.TransferObject.Error.Response
{
    public class ErrorTestResponse
    {
        public Guid TestId { get; set; }
        public string TestName { get; set; }
        public string TestCaseProconditions { get; set; }
        public Newtonsoft.Json.Linq.JToken TestCaseEntryData { get; set; }
        public string Result { get; set; }
        public List<GetStepWithErrorIdsResponse> Steps { get; set; }
    }
}
