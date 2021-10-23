using System;
using System.ComponentModel.DataAnnotations;

namespace Funtest.TransferObject.Attachment.Requests
{
    public class AddAttachmentRequest
    {
        [MaxLength]
        public string Image { get; set; }
        public Guid ErrorId { get; set; }
    }
}
