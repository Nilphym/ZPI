﻿using System;

namespace Funtest.TransferObject.Error.Responses
{
    public class GetErrorResponse
    {
        public Guid Id { get; set; }
        public DateTime Deadline { get; set; }
        public string Description { get; set; }
        public DateTime EndDate { get; set; }
        public string ErrorImpact { get; set; }
        public string Name { get; set; }
        public string ErrorPriority { get; set; }
        public DateTime ReportDate { get; set; }
        public string ErrorState { get; set; }
        public string ErrorType { get; set; }
        public int RetestsRequired { get; set; }
        public int RetestDone { get; set; }
        public int RetestFailed { get; set; }
    }
}