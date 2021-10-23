using AutoMapper;
using Data.Enums;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.Error.Requests;
using Funtest.TransferObject.Error.Responses;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Funtest.Services
{
    public class ErrorService : Service, IErrorService
    {
        public readonly IMapper _mapper;

        public ErrorService(IServiceProvider serviceProvider, IMapper mapper) : base(serviceProvider)
        {
            _mapper = mapper;
        }

        public async Task<GetErrorResponse> GetErrorById(Guid id)
        {
            var error = await Context.Errors.FindAsync(id);
           return  _mapper.Map<GetErrorResponse>(error);
        }

        public List<GetErrorResponse> GetAllErrors()
        {
            var errors = Context.Errors.AsQueryable();
            return errors.Select(x => _mapper.Map<GetErrorResponse>(x)).ToList();
        }

        public List<GetErrorResponse> GetAllErrorsToRetest()
        {
            return Context.Errors.AsQueryable()
                .Where(x => x.ErrorState == Data.Enums.ErrorState.Retest)
                .Select(x => _mapper.Map<GetErrorResponse>(x))
                .ToList();
        }

        public List<GetErrorResponse> GetAllErrorsToFix()
        {
            return Context.Errors.AsQueryable()
                .Where(x => x.ErrorState == Data.Enums.ErrorState.New)
                .Select(x => _mapper.Map<GetErrorResponse>(x))
                .ToList();
        }

        public List<GetErrorResponse> GetAllErrorsAssignedToDeveloper(string developerId)
        {
            return Context.Errors.AsQueryable()
                .Where(x => x.DeveloperId == developerId)
                .Select(x => _mapper.Map<GetErrorResponse>(x))
                .ToList();
        }

        public async Task<bool> EditError(Guid id, EditErrorRequest request)
        {
            var error = await Context.Errors.FindAsync(id);

            if (request.Deadline != DateTime.MinValue)
                error.Deadline = request.Deadline;

            if (request.Description != null)
                error.Description = request.Description;

            if (request.ErrorImpact != null)
                error.ErrorImpact = (ErrorImpact)request.ErrorImpact;

            if (request.ErrorPriority != null)
                error.ErrorPriority = (ErrorPriority)request.ErrorPriority;

            if (request.ErrorType != null)
                error.ErrorType = (ErrorType)request.ErrorType;

            if (request.Name != null)
                error.Name = request.Name;

            Context.Errors.Update(error);
            if (await Context.SaveChangesAsync() == 0)
                return false;

            return true;
        }

        public async Task<bool> AssignBugToDeveloper(Guid errorId, AssignBugToDeveloperRequest request)
        {
            var error = await Context.Errors.FindAsync(errorId);
            error.DeveloperId = request.DeveloperId;

            Context.Errors.Update(error);
            if (await Context.SaveChangesAsync() == 0)
                return false;

            return true;
        }

        public async Task<bool> ResolveError(Guid id, ResolveErrorRequest request)
        {
            var error = await Context.Errors.FindAsync(id);
            error.ErrorState = ErrorState.Repaired;
            error.RetestsRequired = request.RetestRequired;

            Context.Errors.Update(error);
            if (await Context.SaveChangesAsync() == 0)
                return false;

            return true;
        }

        public bool IsErrorExist(Guid id)
        {
            return Context.Errors.Any(x => x.Id == id);
        }

        private List<string> GetDisplayNames(Type type)
        {
            var displaynames = new List<string>();
            var names = Enum.GetNames(type);
            foreach (var name in names)
            {
                var field = type.GetField(name);
                var customAttributes = field.GetCustomAttributes(typeof(DisplayAttribute), true);

                if (customAttributes.Length == 0)
                {
                    displaynames.Add(name);
                }

                foreach (DisplayAttribute attribute in customAttributes)
                {
                    displaynames.Add(attribute.Name);
                }
            }
            return displaynames;
        }


        public List<string> ErrorStates()
        {
            return GetDisplayNames(ErrorState.New.GetType());   
        }

        public List<string> ErrorImpacts()
        {
            return Enum.GetValues(typeof(ErrorImpact)).Cast<ErrorImpact>().Select(x => x.ToString()).ToList();
        }

        public List<string> ErrorPriorities()
        {
            return Enum.GetValues(typeof(ErrorPriority)).Cast<ErrorPriority>().Select(x => x.ToString()).ToList();
        }

        public List<string> ErrorTypes()
        {
            return GetDisplayNames(ErrorType.Functional.GetType());
        }
    }
}

