using AutoMapper;
using Data.Models;
using Funtest.Interfaces;
using Funtest.TransferObject.Steps;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Funtest.Services
{
    public class StepService : Service, IStepService
    {
        public readonly IMapper _mapper;

        public StepService(IServiceProvider serviceProvider, IMapper mapper): base(serviceProvider)
        {
            _mapper = mapper;
        }

        public async Task<bool> AddStep(StepsAddStep dtoStep)
        {
            var step = _mapper.Map<Step>(dtoStep);
            Context.Steps.Add(step);

            if (await Context.SaveChangesAsync() == 0)
                return false;

            return true;
        }

        public IQueryable<StepsGetStep> GetAll()
        {
            var steps = Context.Steps.AsQueryable();
            var s = steps.Select(x => _mapper.Map<StepsGetStep>(x));
            return s;
        }
    }
}
