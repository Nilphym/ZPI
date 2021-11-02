using Funtest.TransferObject.Attachment.Requests;
using Funtest.TransferObject.Attachment.Responses;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Funtest.Services.Interfaces
{
    public interface IAttachmentService
    {
        Task<bool> AddNewAttachment(AddAttachmentRequest request);
        Task<bool> DeleteAttachment(Guid id);
        Task<GetAttachmentResponse> GetAttachment(Guid id);
        List<GetAttachmentResponse> GetAttachmentForError(Guid errorId);
    }
}
