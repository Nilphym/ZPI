using AutoMapper;
using Funtest.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Funtest.Services
{
    public class TestProcedureService : Service, ITestProcedureService
    {
        public readonly IMapper _mapper;

        public TestProcedureService(IServiceProvider serviceProvider, IMapper mapper) : base(serviceProvider)
        {
            _mapper = mapper;
        }

        public bool IsTestProcedureExist(Guid id)
        {
            return Context.TestProcedures.Any(x => x.Id == id);
        }

        public bool IsTestProcedureHasAnySteps(Guid id)
        {
            return Context.TestProcedures
                .Where(x => x.Id == id)
                .Join(Context.Steps, x => x.Id, x => x.TestProcedureId, (testProcedure, step) => new { testProcedure, step })
                .Count(x => x.testProcedure.Steps.Count == 0) == 0 ? false : true;
        }
    }
}
