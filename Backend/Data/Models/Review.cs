using System;
using System.ComponentModel.DataAnnotations;

namespace Data.Models
{
    public class Review
    {
        [Key]
        public Guid Id { get; set; }

        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd/MM/yyyy HH:mm:ss}")]
        public DateTime PublishDate { get; set; }

        public bool IsActual { get; set; }

        public virtual Error Error{ get; set; }
        public Guid? ErrorId { get; set; }
    }
}
