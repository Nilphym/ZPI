using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Models
{
    public class Attachment
    {
        [Key]
        public Guid Id { get; set; }

        [Column(TypeName = "ntext")]
        [MaxLength]
        public string ImageLink { get; set; }

        [ForeignKey("ErrorId")]
        public Guid ErrorId { get; set; }
        public virtual Error Error { get; set; }
    }
}
