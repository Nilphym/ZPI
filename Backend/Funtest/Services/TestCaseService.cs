using AutoMapper;
using Data.Models;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.TestCase.Requests;
using Funtest.TransferObject.TestCase.Responses;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
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
        private int START_PREFIX_LENGTH = 6;

        public TestCaseService(IServiceProvider serviceProvider, IMapper mapper) : base(serviceProvider)
        {
            _mapper = mapper;
        }

        private string GetCode()
        {
            var number = Context.TestCases.AsQueryable().Count();
            var numberOfDigits = Math.Floor(Math.Log10(number));

            if (numberOfDigits > START_PREFIX_LENGTH)
                START_PREFIX_LENGTH = (int)numberOfDigits + 2;

            return $"{PREFIX}-{number.ToString("D"+START_PREFIX_LENGTH.ToString())}";
        }

        public async Task<bool> AddTestCase(AddTestCaseRequest testCaseRequest)
        {
            var testCase = _mapper.Map<TestCase>(testCaseRequest);
            testCase.Code = GetCode();
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
    }
}
