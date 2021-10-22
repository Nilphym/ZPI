using Funtest.TransferObject.Error.Requests;
using Funtest.TransferObject.Error.Responses;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Funtest.Services.Interfaces
{
    public interface IErrorService
    {
        Task<GetErrorResponse> GetErrorById(Guid id);
        List<GetErrorResponse> GetAllErrors();
        List<GetErrorResponse> GetAllErrorsToRetest();
        List<GetErrorResponse> GetAllErrorsToFix();
        List<GetErrorResponse> GetAllErrorsAssignedToDeveloper(string developerId);
        Task<bool> EditError(Guid id, EditErrorRequest request);
        Task<bool> AssignBugToDeveloper(Guid errorId, AssignBugToDeveloperRequest request);
        Task<bool> ResolveError(Guid id, ResolveErrorRequest resolve);
    }
}