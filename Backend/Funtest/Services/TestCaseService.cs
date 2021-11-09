using AutoMapper;
using Data.Models;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.TestCase.Requests;
using Funtest.TransferObject.TestCase.Responses;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Funtest.Services
{
    public class TestCaseService : Service, ITestCaseService
    {
        public readonly IMapper _mapper;
        private static string PREFIX = "TC";

        public TestCaseService(IServiceProvider serviceProvider, IMapper mapper) : base(serviceProvider)
        {
            _mapper = mapper;
        }

        private string GetCode(Guid index)
        {
            return $"{PREFIX}-{index.ToString().Substring(0, 8).ToUpper()}";
        }

        public async Task<bool> AddTestCase(AddTestCaseRequest testCaseRequest)
        {
            var testCase = _mapper.Map<TestCase>(testCaseRequest);
            var index = Guid.NewGuid();
            testCase.Id = index;
            testCase.Code = GetCode(index);
            Context.TestCases.Add(testCase);

            if (await Context.SaveChangesAsync() == 0)
                return false;

            return true;
        }

        public async Task<bool> EditTestCase(Guid id, EditTestCaseRequest request)
        {
            var testCase = await Context.TestCases.FindAsync(id);

            testCase.Preconditions = request.Preconditions;
            testCase.EntryDataObject = request.EntryDataObject;
            testCase.EntryData = JsonConvert.SerializeObject(testCase.EntryDataObject);

            Context.TestCases.Update(testCase);
            if (await Context.SaveChangesAsync() == 0)
                return false;

            return true;
        }

        public async Task<GetTestCaseResponse> GetTestCaseById(Guid id)
        {
            var testCase = await Context.TestCases.FindAsync(id);
            return _mapper.Map<GetTestCaseResponse>(testCase);
        }

        public List<GetTestCaseIdentityValueResponse> GetAllTestCasesForProduct(Guid productId)
        {
            return Context.TestCases.AsQueryable()
                .Where(x => x.ProductId == productId)
                .Select(x => _mapper.Map<GetTestCaseIdentityValueResponse>(x)).ToList();
        }

        public async Task<bool> ExistTestCase(Guid id)
        {
            return await Context.TestCases.FindAsync(id) != null ? true : false;
        }

        public bool IsEditPossible(Guid testCaseId)
        {
           return Context.Tests
                .Where(x => x.TestCaseId == testCaseId && x.ExecutionCounter > 0)
                .Count() == 0;
        }

        public async Task<Guid?> CreateNewTestCaseBaseOnExistTCWithModification(Guid testCaseId, EditTestCaseRequest editedTestCase)
        {
            var testCase = await Context.TestCases.FindAsync(testCaseId);

            var index = Guid.NewGuid();
            TestCase copyTestCase = new TestCase()
            {
                Id = index,
                Code = GetCode(index),
                Preconditions = editedTestCase.Preconditions,
                EntryDataObject = editedTestCase.EntryDataObject,
                ProductId = testCase.ProductId
            };

            Context.TestCases.Add(copyTestCase);
            if (await Context.SaveChangesAsync() == 0)
                return null;

            return index;
        }
    }
}
