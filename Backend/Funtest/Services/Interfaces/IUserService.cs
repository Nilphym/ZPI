using Data.Models;
using System.Threading.Tasks;

namespace Funtest.Services.Interfaces
{
    public interface IUserService
    {
        Task<bool> IsUserExist(string userId);
    }
}
