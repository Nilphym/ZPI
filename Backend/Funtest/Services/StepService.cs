using AutoMapper;
using Data.Models;
using Funtest.Interfaces;
using Funtest.TransferObject.Steps.Requests;
using Funtest.TransferObject.Steps.Responses;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Funtest.Services
{
    public class StepService : Service, IStepService
    {
        public readonly IMapper _mapper;

        public StepService(IServiceProvider serviceProvider, IMapper mapper) : base(serviceProvider)
        {
            _mapper = mapper;
        }

        public async Task<bool> AddStep(AddStepRequest dtoStep)
        {
            var step = _mapper.Map<Step>(dtoStep);
            Context.Steps.Add(step);

            if (await Context.SaveChangesAsync() == 0)
                return false;

            return true;
        }

        public async Task<bool> EditStep(Guid id, EditStepRequest dtoStep)
        {
            var step = _mapper.Map<Step>(await Context.Steps.FindAsync(id));
            step.Name = dtoStep.Name;
            step.TestDataObject = dtoStep.TestDataObject;
            step.TestData = JsonConvert.SerializeObject(step.TestDataObject);
            step.ControlPoint = dtoStep.ControlPoint;

            Context.Steps.Update(step);

            if (await Context.SaveChangesAsync() == 0)
                return false;
            return true;
        }

        public IQueryable<GetStepResponse> GetAllSteps()
        {
            var steps = Context.Steps.AsQueryable();
            return steps.Select(x => _mapper.Map<GetStepResponse>(x));
        }

        public List<GetStepResponse> GetAllStepsForTestProcedure(Guid testProcedureId)
        {
            var steps = Context.Steps.Where(x => x.TestProcedureId == testProcedureId).AsQueryable();
            return steps.Select(x => _mapper.Map<GetStepResponse>(x)).ToList();
        }

        public async Task<GetStepResponse> GetStep(Guid stepId)
        {
            var step = await Context.Steps.FindAsync(stepId);
            return _mapper.Map<GetStepResponse>(step);
        }

        public async Task<List<GetStepWithErrors>> GetStepsWithErrorsForTest(Guid testId)
        {
            var result = new List<GetStepWithErrors>();
            var testProcedureId = (await Context.Tests.FindAsync(testId)).TestProcedure.Id;
            var steps = Context.Steps.Where(x => x.TestProcedureId == testProcedureId).ToList();

            foreach (var step in steps)
            {
                var errorsInStep = Context.Errors.Where(x => x.StepId == step.Id).ToList();
                var errorIds = Context.Errors.Where(x => x.StepId == step.Id).Select(x => x.Id).ToList();

                var newStep = new GetStepWithErrors()
                {
                    Id = step.Id,
                    Name = step.Name,
                    TestData = step.TestData,
                    ControlPoint = step.ControlPoint,
                    ErrorIds = errorIds
                };

                result.Add(newStep);
            }

            return result;
        }

        public bool IsStepExist(Guid id)
        {
            return Context.Steps.Any(x => x.Id == id);
        }
    }
}
