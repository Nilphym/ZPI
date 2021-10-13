using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.Models
{
    public class TestSuite
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Category { get; set; }

        public virtual TestPlan TestPlan { get; set; }
        public Guid? TestPlanId { get; set; }

        public virtual ICollection<Test> Tests { get; set; }
    }
}
