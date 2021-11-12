using Data.Models;
using Funtest.TransferObject.Account.Requests;
using Funtest.TransferObject.Admin.Requests;
using System;
using System.Threading.Tasks;

namespace Funtest.Services.Interfaces
{
    public interface IAccountService
    {
        Task<string> AddNewUser(AddNewUserRequest request, Product product);
        Task<string> AddInvitedUser(RegisterInvitatedUserRequest request, Product product);
        Task<bool> ForgotPassword(ForgotPasswordRequest request);
        Task<bool> ResetPassword(ResetPasswordRequest request);
        Task<bool> RemoveAccount(RemoveAccountRequest request, string pmId);
        Task<bool> IsTheSameTeam(string user1Id, string user2Id);
    }
}
