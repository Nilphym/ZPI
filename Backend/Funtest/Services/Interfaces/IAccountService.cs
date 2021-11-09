using Data.Models;
using Funtest.TransferObject.Account.Requests;
using Funtest.TransferObject.Admin.Requests;
using System.Threading.Tasks;

namespace Funtest.Services.Interfaces
{
    public interface IAccountService
    {
        Task<string> AddNewUser(AddNewUserRequest request, Product product);
        Task<bool> ForgotPassword(ForgotPasswordRequest request); 
    }
}
