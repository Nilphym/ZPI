using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Models
{
    public class Test
    {
        [Key]
        public Guid Id { get; set; }

        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd/MM/yyyy HH:mm}")]
        public DateTime CreationDate { get; set; }

        [Required]
        public string Name { get; set; }
        public int ExecutionCounter { get; set; }

        [ForeignKey("TestSuiteId")]
        public virtual TestSuite TestSuite { get; set; }
        public Guid? TestSuiteId { get; set; }

        [ForeignKey("TestProcedureId")]
        public TestProcedure TestProcedure { get; set; }
        public Guid? TestProcedureId { get; set; }

        [ForeignKey("TestCaseId")]
        public virtual TestCase TestCase { get; set; }
        public Guid? TestCaseId { get; set; }
    }
}
