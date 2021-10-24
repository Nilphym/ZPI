using Funtest.TransferObject.Attachment.Requests;
using System.Threading.Tasks;

namespace Funtest.Services.Interfaces
{
    public interface IAttachmentService
    {
        Task<bool> AddNewAttachment(AddAttachmentRequest request);

    }
}
