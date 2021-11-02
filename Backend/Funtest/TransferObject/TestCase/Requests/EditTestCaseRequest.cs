using Newtonsoft.Json.Linq;
using System;

namespace Funtest.TransferObject.TestCase.Requests
{
    public class EditTestCaseRequest
    {
        public Guid TestId { get; set; }
        public string Preconditions { get; set; }
        public JObject EntryDataObject { get; set; }
    }
}
