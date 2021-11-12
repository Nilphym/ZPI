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

        public readonly IMapper _mapper;

        public TestProcedureService(IServiceProvider serviceProvider, IMapper mapper) : base(serviceProvider)
        {
            _mapper = mapper;
        }

        private string GetCode(Guid index)
        {
            return $"{PREFIX}-{index.ToString().Substring(0, 8).ToUpper()}";
        }

        public async Task<bool> AddTestProcedure(AddTestProcedureRequest dtoTestProcedure)
        {
            var testProcedure = _mapper.Map<TestProcedure>(dtoTestProcedure);
            var index = Guid.NewGuid();
            testProcedure.Id = index;
            testProcedure.Code = GetCode(index);
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

        public List<GetTestProcedureWithTestCaseResponse> GetAllTestProceduresForProduct(Guid productId)
        {
            return Context.TestProcedures
                .AsQueryable()
                .Where(x => x.TestCase.ProductId == productId)
                .Select(x => _mapper.Map<GetTestProcedureWithTestCaseResponse>(x))
                .ToList();
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

        public bool IsEditPossible(Guid testProcedureId)
        {
            return Context.Tests
                           .Where(x => x.TestProcedureId == testProcedureId && x.ExecutionCounter > 0)
                           .Count() == 0;
        }

        public async Task<Guid?> CreateNewTestProcedureBaseOnExistTPWithModification(Guid testProcedureId, Guid testCaseId, EditTestProcedureRequest editedTestProcedure)
        {
            var testProcedure = await Context.TestProcedures.FindAsync(testProcedureId);

            var index = Guid.NewGuid();
            TestProcedure copyTestProcedures = new TestProcedure()
            {
                Id = index,
                Code = GetCode(index),
                Result = editedTestProcedure.Result,
                TestCaseId = testCaseId
            };

            Context.TestProcedures.Add(copyTestProcedures);
            if (await Context.SaveChangesAsync() == 0)
                return null;

            return index;
        }
    }
}
