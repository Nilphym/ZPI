using Newtonsoft.Json.Linq;
using System;

namespace Funtest.TransferObject.TestCase.Responses
{
    public class GetTestCaseResponse
    {
        public Guid Id { get; set; }
        public string Code { get; set; }
        public string Preconditions { get; set; }
        public JObject EntryDataObject { get; set; }
    }
}
