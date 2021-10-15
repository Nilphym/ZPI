using AutoMapper;
using Data.Models;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.TestCase.Requests;
using Funtest.TransferObject.TestCase.Responses;
using System;
using System.Threading.Tasks;

namespace Funtest.Services
{
    public class TestCaseService : Service, ITestCaseService
    {
        public readonly IMapper _mapper;

        public TestCaseService(IServiceProvider serviceProvider, IMapper mapper): base(serviceProvider)
        {
            _mapper = mapper;
        }

        public async Task<bool> AddTestCase(AddTestCaseRequest testCaseRequest)
        {
           var testCase = _mapper.Map<TestCase>(testCaseRequest);
            Context.TestCases.Add(testCase);

            if (await Context.SaveChangesAsync() == 0)
                return false;

            return true;
        }

        public async Task<GetTestCaseResponse> GetTestCaseById(Guid id)
        {
            var testCase = await Context.TestCases.FindAsync(id);
            return _mapper.Map<GetTestCaseResponse>(testCase);

        }
    }
}
