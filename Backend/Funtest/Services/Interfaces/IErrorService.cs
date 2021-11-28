using Data.Enums;
using Data.Models;
using Funtest.TransferObject.Error.Requests;
using Funtest.TransferObject.Error.Response;
using Funtest.TransferObject.Error.Responses;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Funtest.Services.Interfaces
{
    public interface IErrorService
    {
        Task<GetErrorResponse> GetErrorById(Guid id);
        Task<Error> GetModelErrorById(Guid id);
        Task<bool> AddError(AddErrorRequest request, string testSuiteCategory);
        Task<bool> SetErrorCategory(Error error, string category);
        List<GetErrorResponse> GetAllErrors(Guid productId);
        List<GetErrorResponse> GetAllErrorsToRetest(Guid productId);
        List<GetErrorResponse> GetAllErrorsToFix(Guid productId);
        List<GetErrorResponse> GetAllErrorsAssignedToDeveloper(string developerId);
        Task<bool> EditError(Guid id, EditErrorRequest request);
        Task<bool> AssignBugToDeveloper(Guid errorId, DeveloperAssignedToErrorRequest request);
        Task<bool> ResolveError(Guid id, ResolveErrorRequest resolve);
        Task<bool> RejectError(Guid id, DeveloperAssignedToErrorRequest request);
        Task<bool> ResignError(Guid id, DeveloperAssignedToErrorRequest request);
        bool IsErrorExist(Guid id);
        Task<bool> IsErrorNotAssigned(Guid errorId);
        List<string> ErrorStates();
        List<string> ErrorImpacts();
        List<string> ErrorPriorities();
        List<string> ErrorTypes();
        Task<GetErrorTestWithProcedureAndCaseResponse> GetErrorTest(Guid errorId);
        List<GetIdentityErrorInformationRespons> GetAllErrorsForStep(Guid stepId);
        Task<bool> IsErrorReviewed(Guid errorId);
        Task<bool> ChangeErrorStatus(Guid errorId, ErrorState errorState);
        Task<bool> ResignFromEverErrors(string developerId);
    }
}