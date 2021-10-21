using Newtonsoft.Json.Linq;

namespace Funtest.TransferObject.TestCase.Requests
{
    public class EditTestCaseRequest
    {
        public string Preconditions { get; set; }
        public JObject EntryDataObject { get; set; }
    }
}
