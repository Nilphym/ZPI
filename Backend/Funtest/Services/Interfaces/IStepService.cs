using Funtest.TransferObject.Steps.Requests;
using Funtest.TransferObject.Steps.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Funtest.Interfaces
{
    public interface IStepService
    {
        Task<bool> AddStep(AddStepRequest step);
        List<GetStepResponse> GetAllStepsForTestProcedure(Guid testProcedureId);
        IQueryable<GetStepResponse> GetAllSteps();
        Task<bool> EditStep(Guid id, EditStepRequest step);
        bool IsStepExist(Guid id);
        Task<List<GetStepWithErrors>> GetStepsWithErrorsForTest(Guid testId);
    }
}
