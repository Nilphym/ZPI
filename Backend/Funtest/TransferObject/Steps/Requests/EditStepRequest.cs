using Newtonsoft.Json.Linq;

namespace Funtest.TransferObject.Steps.Requests
{
    public class EditStepRequest
    {
        public string Name { get; set; }
        public JObject TestDataObject { get; set; }
        public string ControlPoint { get; set; }
    }
}
