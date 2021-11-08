using Data.Enums;
using System;

namespace Funtest.TransferObject.Error.Requests
{
    public class EditErrorRequest
    {
        public string? ErrorType { get; set; }
        public string? ErrorImpact { get; set; }
        public string? ErrorPriority { get; set; }
        public DateTime Deadline { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
