using AutoMapper;
using Data.Models;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.TestProcedure.Requests;
using Funtest.TransferObject.TestProcedure.Responses;
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

        public async Task<bool> AddTestProcedure(AddTestProcedureRequest dtoTestProcedure)
        {
            var testProcedure = _mapper.Map<TestProcedure>(dtoTestProcedure);
            Context.TestProcedures.Add(testProcedure);

            if (await Context.SaveChangesAsync() == 0)
                return false;
            return true;
        }

        public async Task<GetTestProcedureResponse> GetTestProcedureById(Guid id)
        {
            var testProcedure = await Context.TestProcedures.FindAsync(id);
            return _mapper.Map<GetTestProcedureResponse>(testProcedure);
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
