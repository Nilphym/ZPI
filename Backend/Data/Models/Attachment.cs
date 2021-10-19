using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Models
{
    public class Attachment
    {
        [Column(TypeName = "ntext")]
        [MaxLength]
        public string Photo{ get; set; }

        public FileExtensionsAttribute FileExtension { get; set; }

        public virtual Error Error { get; set; }
        public Guid ErrorId{ get; set; }
    }
}
