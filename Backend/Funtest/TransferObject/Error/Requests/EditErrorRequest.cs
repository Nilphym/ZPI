using Data.Enums;
using System;

namespace Funtest.TransferObject.Error.Requests
{
    public class EditErrorRequest
    {
        public ErrorType? ErrorType { get; set; }
        public ErrorImpact? ErrorImpact { get; set; }
        public ErrorPriority? ErrorPriority { get; set; }
        public DateTime Deadline { get; set; }
        public string Name { get; set; }
        public DateTime ReportDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Description { get; set; }
    }
}
