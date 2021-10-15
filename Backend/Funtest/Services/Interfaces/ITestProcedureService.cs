using System;

namespace Funtest.Services.Interfaces
{
    public interface ITestProcedureService
    {
        bool IsTestProcedureExist(Guid id);
        bool IsTestProcedureHasAnySteps(Guid id);
    }
}
