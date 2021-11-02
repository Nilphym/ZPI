using Funtest.TransferObject.Email.Requests;

namespace Funtest.Services.Interfaces
{
    public interface IEmailService
    {
        bool SendInvitationLink(DataToInvitationLinkRequest request);
    }
}
