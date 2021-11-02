using Funtest.TransferObject.Steps.Responses;
using Funtest.TransferObject.TestProcedure.Responses;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;

namespace Funtest.TransferObject.Test.Response
{
    public class GetTestIdentityInformationResponse
    {
        public Guid TestId { get; set; }

        public string TestName { get; set; }

        public string TestCaseProconditions { get; set; }
        public JObject TestCaseEntryData { get; set; }

        public string  Result { get; set; }
        public List<GetStepsWithErrors> Steps { get; set; }
    }
}
