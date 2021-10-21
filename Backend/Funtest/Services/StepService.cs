using AutoMapper;
using Data.Models;
using Funtest.Interfaces;
using Funtest.TransferObject.Steps.Requests;
using Funtest.TransferObject.Steps.Responses;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
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
            step.TestDataObject = dtoStep.EntryDataObject;
            step.TestData = (string)JsonConvert.DeserializeObject<JObject>(string.IsNullOrEmpty(step.TestData) ? "{}" : step.TestData.ToString());
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
    }
}
