using Funtest.TransferObject.TestCase.Requests;
using Funtest.TransferObject.TestCase.Responses;
using System;
using System.Threading.Tasks;

namespace Funtest.Services.Interfaces
{
    public interface ITestCaseService
    {
        Task<bool> AddTestCase(AddTestCaseRequest testCaseRequest);
        Task<GetTestCaseResponse> GetTestCaseById(Guid id);

        //IQueryable<StepsGetStep> GetAllStepsForTestProcedure(Guid testProcedureId);
    }
}
