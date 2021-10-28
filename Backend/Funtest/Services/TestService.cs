using AutoMapper;
using Data.Models;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.Test.Requests;
using Funtest.TransferObject.Test.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Funtest.Services
{
    public class TestService : Service, ITestService
    {
        public readonly IMapper _mapper;
        public TestService(IServiceProvider serviceProvider, IMapper mapper) : base(serviceProvider)
        {
            _mapper = mapper;
        }

        public async Task<bool> AddTest(AddTestRequest dtoTest)
        {
            var test = _mapper.Map<Test>(dtoTest);
            Context.Tests.Add(test);

            if (await Context.SaveChangesAsync() == 0)
                return false;
            return true;
        }
        /// <summary>
        /// TO DO: KOMUNIKATY ODPOWIEDNIE 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="request"></param>
        /// <returns></returns>
        public async Task<bool> EditTest(Guid id, EditTestRequest request)
        {
            var test = await Context.Tests.FindAsync(id);

            if (test.ExecutionCounter > 0)
                return false;

            test.Name = request.Name;

            if (request.TestCaseId != null)
                test.TestCaseId = request.TestCaseId;


            if (request.TestProcedureId != null)
                test.TestProcedureId = request.TestProcedureId;


            if (request.TestSuiteId != null)
                test.TestSuiteId = request.TestSuiteId;

            Context.Tests.Update(test);

            if (await Context.SaveChangesAsync() == 0)
                return false;
            return true;
        }

        public List<GetTestBasicInformationResponse> GetAllTestsForTestPlan(Guid testPlanId)
        {
            var tests = Context.Tests.Where(x => x.TestSuite.TestPlanId == testPlanId).AsQueryable();
            return tests.Select(x => _mapper.Map<GetTestBasicInformationResponse>(x)).ToList();
        }

        public async Task<int> GetExecutionCounterForTest(Guid id)
        {
            return (await Context.Tests.FindAsync(id)).ExecutionCounter;
        }

        public async Task<GetTestResponse> GetTestById(Guid id)
        {
            var test = await Context.Tests.FindAsync(id);
            return _mapper.Map<GetTestResponse>(test);
        }

        public List<GetTestIdentityInformationResponse> GetTestsDataForTestPlan(Guid testPlanId)
        {
            var testsData = Context.Tests.Where(x => x.TestSuite.TestPlanId == testPlanId);
            return testsData.Select(x => _mapper.Map<GetTestIdentityInformationResponse>(x)).ToList();
        }

        public List<GetTestIdentityInformationResponse> GetTestsDataForTestSuite(Guid testSuiteId)
        {
            var testsData = Context.Tests.Where(x => x.TestSuiteId == testSuiteId);
            return testsData.Select(x => _mapper.Map<GetTestIdentityInformationResponse>(x)).ToList();
        }

        public bool IsTestExist(Guid id)
        {
            return Context.Tests.Any(x => x.Id == id);
        }
    }
}
