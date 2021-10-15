using Newtonsoft.Json.Linq;

namespace Funtest.TransferObject.TestCase.Responses
{
    public class GetTestCaseResponse
    {
        public string Preconditions { get; set; }
        public JObject EntryDataObject { get; set; }
    }
}
