using Funtest.TransferObject.Steps;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Funtest.Interfaces
{
    public interface IStepService
    {
        Task<bool> AddStep(StepsAddStep step);
        IQueryable<StepsGetStep> GetAllStepsForTestProcedure(Guid testProcedureId);
        IQueryable<StepsGetStep> GetAllSteps();
    }
}
