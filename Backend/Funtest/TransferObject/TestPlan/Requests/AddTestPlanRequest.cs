﻿using System;

namespace Funtest.TransferObject.TestPlan.Requests
{
    public class AddTestPlanRequest
    {
        public string Name { get; set; }
        public Guid ProductId { get; set; }

    }
}
