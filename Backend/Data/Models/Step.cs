using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Models
{
    public class Step
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Name{ get; set; }

        public int StepNumber { get; set; }
        
        [Required] //tez json
        public string  TestData { get; set; }

        [NotMapped]
        public JObject TestDataObject
        {
            get
            {
                return JsonConvert.DeserializeObject<JObject>(string.IsNullOrEmpty(TestData) ? "{}" : TestData);
            }
            set
            {
                TestData = value.ToString();
            }
        }

        [Required]
        public string ControlPoint { get; set; }


        public virtual TestProcedure TestProcedure{ get; set; }
        public Guid? TestProcedureId { get; set; }

        public virtual ICollection<Error> Errors{ get; set; }
    }
}
