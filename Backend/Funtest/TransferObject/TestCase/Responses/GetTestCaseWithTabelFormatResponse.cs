using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Funtest.TransferObject.TestCase.Responses
{
    public class GetTestCaseWithTabelFormatResponse
    {
        public Guid Id { get; set; }
        public string Code { get; set; }
        public string Preconditions { get; set; }
        public JToken EntryDataObject { get; set; }
    }
}
