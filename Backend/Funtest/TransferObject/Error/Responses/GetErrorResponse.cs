using Data.Enums;
using System;
using System.Collections.Generic;

namespace Funtest.TransferObject.Error.Responses
{
    public class GetErrorResponse
    {
        public DateTime Deadline { get; set; }
        public string Description { get; set; }
        public DateTime EndDate { get; set; }
        public ErrorImpact ErrorImpact { get; set; }
        public string Name { get; set; }
        public ErrorPriority ErrorPriority { get; set; }
        public DateTime ReportDate { get; set; }
        public ErrorState ErrorState { get; set; }
        public ErrorType ErrorType { get; set; }
        public int RetestsRequired { get; set; }
        public int RetestDone { get; set; }
        public int RetestFailed { get; set; }

        //public List<string> Attachments { get; set; }
    }
}
