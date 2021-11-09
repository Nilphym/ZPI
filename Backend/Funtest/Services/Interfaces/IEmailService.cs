using Data.Models;
using Funtest.TransferObject.Email.Requests;
using System.Threading.Tasks;

namespace Funtest.Services.Interfaces
{
    public interface IEmailService
    {
        Task<bool> SendInvitationLinkAsync(DataToInvitationLinkRequest request);
        Task<bool> SendResetPasswordMail(User user, string passwordResetToken, string baseUrl);
    }
}
