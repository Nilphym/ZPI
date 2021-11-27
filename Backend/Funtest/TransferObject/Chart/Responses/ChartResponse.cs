using Funtest.TransferObject.TestSuite.Responses;
using System.Collections.Generic;

namespace Funtest.TransferObject.Chart.Responses
{
    public class ChartResponse
    {
        public int DaysFromStart { get; set; }
        public int TestersNumber { get; set; }
        public int DevsNumber { get; set; }
        public int TestPlansNumber { get; set; }
        public int TestSuitesNumber { get; set; }
        public int TestsNumber { get; set; }
        public List<GetNumberOfTestInTestSuitResponse> TestSuitesByName { get; set; }
    }
}
