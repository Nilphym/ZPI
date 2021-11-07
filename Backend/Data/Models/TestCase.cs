using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Models
{
    public class TestCase
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Code { get; set; }

        public string Preconditions { get; set; }

        public string EntryData { get; set; }

        [NotMapped]
        public JObject EntryDataObject
        {
            get
            {
                return JsonConvert.DeserializeObject<JObject>(string.IsNullOrEmpty(EntryData) ? "{}" : EntryData);
            }
            set
            {
                EntryData = value == null ? "{}" : value.ToString();
            }
        }

        [ForeignKey("ProductId")]
        public virtual Product Product { get; set; }
        public Guid ProductId { get; set; }

        public virtual ICollection<Test> Tests { get; set; }

        public virtual ICollection<TestProcedure> TestProcedures { get; set; }
    }
}
