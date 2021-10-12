using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Models
{
    public class TestProcedure
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Result { get; set; }

        public virtual ICollection<Test> Tests { get; set; }

        public virtual ICollection<Step> Steps { get; set; }

        [ForeignKey("TestCaseId")]
        public virtual TestCase TestCase { get; set; }
        public Guid? TestCaseId { get; set; }
    }
}
