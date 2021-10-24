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
        private static string PREFIX = "TP";
        private int START_PREFIX_LENGTH = 6;

        public readonly IMapper _mapper;

        public TestProcedureService(IServiceProvider serviceProvider, IMapper mapper) : base(serviceProvider)
        {
            _mapper = mapper;
        }

        private string GetCode()
        {
            var number = Context.TestCases.AsQueryable().Count();
            var numberOfDigits = Math.Floor(Math.Log10(number));

            if (numberOfDigits > START_PREFIX_LENGTH)
                START_PREFIX_LENGTH = (int)numberOfDigits + 2;

            return $"{PREFIX}-{number.ToString("D" + START_PREFIX_LENGTH.ToString())}";
        }

        public async Task<bool> AddTestProcedure(AddTestProcedureRequest dtoTestProcedure)
        {
            var testProcedure = _mapper.Map<TestProcedure>(dtoTestProcedure);
            testProcedure.Code = GetCode();
            Context.TestProcedures.Add(testProcedure);

            if (await Context.SaveChangesAsync() == 0)
                return false;
            return true;
        }

        public async Task<bool> EditTestProcedure(Guid id, EditTestProcedureRequest request)
        {
            var procedure = await  Context.TestProcedures.FindAsync(id);
            procedure.Result = request.Result;

            Context.Update(procedure); 

            if (await Context.SaveChangesAsync() == 0)
                return false;
            return true;
        }

        public List<GetTestProcedureIdentityValueResponse> GetAllTestProcedures()
        {
            return Context.TestProcedures.AsQueryable().Select(x => _mapper.Map<GetTestProcedureIdentityValueResponse>(x)).ToList();
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
