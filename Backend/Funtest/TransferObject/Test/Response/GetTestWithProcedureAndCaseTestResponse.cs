using Funtest.TransferObject.TestCase.Responses;
using Funtest.TransferObject.TestProcedure.Responses;
using Funtest.TransferObject.TestSuite.Responses;
using System;

namespace Funtest.TransferObject.Test.Response
{
    public class GetTestWithProcedureAndCaseTestResponse
    {
        public Guid Id { get; set; }

        public DateTime CreationDate { get; set; }

        public int ExecutionCounter { get; set; }

        public string Name { get; set; }

        public GetTestSuiteResponse TestSuite { get; set; }

        public GetResultTestProcedureResponse TestProcedure { get; set; }

        public GetTestCaseWithTabelFormatResponse TestCase { get; set; }
    }
}
