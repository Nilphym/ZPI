using Funtest.TransferObject.Test.Requests;
using Funtest.TransferObject.Test.Response;
using System;
using System.Threading.Tasks;

namespace Funtest.Services.Interfaces
{
    public interface ITestService
    {
        Task<bool> AddTest(AddTestRequest test);
        GetTestResponse GetTestById(Guid id);
    }
}
