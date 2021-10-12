using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.Models
{
    public class TestPlan
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }

        public virtual Product Produkt { get; set; }
        public Guid? ProductId { get; set; }

        public virtual ICollection<TestSuite> TestSuites { get; set; }
    }
}
