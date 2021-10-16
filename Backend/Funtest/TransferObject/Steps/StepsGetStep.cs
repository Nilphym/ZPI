using Newtonsoft.Json.Linq;

namespace Funtest.TransferObject.Steps
{
    public class StepsGetStep
    {
        public string Name { get; set; }
        public int StepNumber { get; set; }
        public JObject TestDataObject { get; set; }
        public string ControlPoint { get; set; }
    }
}
