using Funtest.TransferObject.Steps.Responses;
using System;
using System.Collections.Generic;

namespace Funtest.TransferObject.Error.Responses
{
    public class GetErrorTestWithProcedureAndCaseResponse
    {
            public Guid TestId { get; set; }
            public string TestName { get; set; }
            public DateTime CreationDate { get; set; }
            public Guid TestCaseId { get; set; }
            public string TestCaseCode { get; set; }
            public string TestCaseProconditions { get; set; }
            public Newtonsoft.Json.Linq.JToken TestCaseEntryData { get; set; }
            public Guid TestProcedureId { get; set; }
            public string TestProcedureCode { get; set; }
            public string Result { get; set; }
            public List<GetStepWithErrorIdsResponse> Steps { get; set; }
    }
}
