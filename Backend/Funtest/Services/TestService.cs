using AutoMapper;
using Data.Models;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.Test.Requests;
using Funtest.TransferObject.Test.Response;
using Microsoft.EntityFrameworkCore;
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
            test.CreationDate = DateTime.Now;
            test.TestSuiteId = dtoTest.PlanSuiteId;
            Context.Tests.Add(test);

            if (await Context.SaveChangesAsync() == 0)
                return false;
            return true;
        }

        public async Task<bool> AssignNewTestCase(Guid testId, Guid testCaseId)
        {
            var test = await Context.Tests.FindAsync(testId);
            test.TestCaseId = testCaseId;
            Context.Tests.Update(test);

            if (await Context.SaveChangesAsync() == 0)
                return false;
            return true;
        }

        public async Task<bool> AssignNewTestProcedure(Guid testId, Guid testProcedureId)
        {
            var test = await Context.Tests.FindAsync(testId);
            test.TestProcedureId = testProcedureId;
            Context.Tests.Update(test);

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

            test.Name = request.Name;

            if (request.TestCaseId != null)
            {
                test.TestCaseId = request.TestCaseId;
                test.TestCase = await Context.TestCases.FindAsync(request.TestCaseId);
            }


            if (request.TestProcedureId != null)
            {
                test.TestProcedureId = request.TestProcedureId;
                test.TestProcedure = await Context.TestProcedures.FindAsync(request.TestProcedureId);
            }


            if (request.TestSuiteId != null)
            {
                test.TestSuiteId = request.TestSuiteId;
                test.TestSuite = await Context.TestSuites.FindAsync(request.TestSuiteId);
            }

            Context.Tests.Update(test);

            if (await Context.SaveChangesAsync() == 0)
                return false;
            return true;
        }

        public async Task<bool> ExecuteTest(Guid id)
        {
            var test = await Context.Tests.FindAsync(id);
            if (test == null)
                return false;

            test.ExecutionCounter++;
            if (await Context.SaveChangesAsync() == 0)
                return false;
            return true;
        }

        public async Task<Test> FindTest(Guid id)
        {
            return Context.Tests.Include(x => x.TestSuite).ToList().Where(x => x.Id == id).FirstOrDefault();
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
