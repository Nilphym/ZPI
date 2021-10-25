using Funtest.TransferObject.Admin.Requests;
using System.Threading.Tasks;

namespace Funtest.Services.Interfaces
{
    public interface IAdminService
    {
        Task<bool> AddNewUser(AddNewUserRequest request);

        Task<bool> AddProjectManager(AddProjectManageRequest request);
    }
}
