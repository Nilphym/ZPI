using Data.Models;
using Data.Roles;
using Funtest.TransferObject.Auth.Requests;
using Funtest.TransferObject.Auth.Responses;
using System.Threading.Tasks;

namespace Funtest.Services.Interfaces
{
    public interface IAuthService
    {
        Task<LoginResponse> Login(LoginRequest request);
        Task<User> FindUser(string email);
        Task<User> FindUserByUserName(string userName);
        Task<string> UserRole(User user);
    }
}
