﻿using Funtest.TransferObject.TestCase.Responses;
using Funtest.TransferObject.TestProcedure.Responses;
using Funtest.TransferObject.TestSuite.Responses;
using System;
using System.Collections.Generic;

namespace Funtest.TransferObject.Test.Response
{
    public class GetTestResponse
    {
        public Guid Id { get; set; }

        public DateTime CreationDate { get; set; }

        public int ExecutionCounter { get; set; }

        public string Name { get; set; }

        public Data.Models.TestSuite TestSuite { get; set; }

        public Data.Models.TestProcedure TestProcedure { get; set; }

        public Data.Models.TestCase TestCase { get; set; }

        public List<GetTestSuiteResponse> TestSuites { get; set; }

        public List<GetTestProcedureIdentityValueResponse> TestProcedures { get; set; }

        public List<GetTestCaseIdentityValueResponse> TestCases { get; set; }


    }
}
