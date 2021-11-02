using Data.Enums;
using System;

namespace Funtest.TransferObject.Error.Requests
{
    public class AddErrorRequest
    {
        public string Name { get; set; }
        public Guid TestId { get; set; }

        public DateTime ReportDate { get; set; }

        public string? Description { get; set; }

        public DateTime? Deadline { get; set; }

        public ErrorImpact ErrorImpact { get; set; }

        public ErrorPriority ErrorPriority { get; set; }

        public ErrorType ErrorType { get; set; }

        public Guid StepId { get; set; }
        public string TesterId { get; set; }
    }
}
