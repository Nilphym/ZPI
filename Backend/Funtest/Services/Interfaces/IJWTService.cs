using Data.Models;
using System.Threading.Tasks;

namespace Funtest.Services.Interfaces
{
    public interface IJWTService
    {
        Task<string> GenerateJWToken(User user);
    }
}