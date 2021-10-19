using Funtest.TransferObject.Error.Responses;
using System;
using System.Threading.Tasks;

namespace Funtest.Services.Interfaces
{
    public interface IErrorService
    {
        Task<GetErrorResponse> GetErrorById(Guid id);

    }
}
