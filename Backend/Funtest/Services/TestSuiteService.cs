using AutoMapper;
using Data.Models;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.TestSuite.Requests;
using Funtest.TransferObject.TestSuite.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Funtest.Services
{
    public class TestSuiteService : Service, ITestSuiteService
    {
        public readonly IMapper _mapper;

        public TestSuiteService(IServiceProvider serviceProvider, IMapper mapper) : base(serviceProvider)
        {
            _mapper = mapper;
        }

        public async Task<bool> AddTestSuite(AddTestSuiteRequest request)
        {
            var testSuite = _mapper.Map<TestSuite>(request);
            Context.Add(testSuite);

            if (await Context.SaveChangesAsync() == 0)
                return false;

            return true;
        }

        public async Task<bool> EditTestSuite(Guid id, EditTestSuiteRequest request)
        {
            var testSuite = await Context.TestSuites.FindAsync(id);

            if (testSuite == null)
                return false;

            if (request.Category == "")
                return false;

            testSuite.Category = request.Category;
            Context.Update(testSuite);

            if (await Context.SaveChangesAsync() == 0)
                return false;

            return true;
        }

        public List<GetTestSuiteResponse> GetAllTestSuites()
        {
            return Context.TestSuites.AsQueryable().Select(x => _mapper.Map<GetTestSuiteResponse>(x)).ToList();
        }

        public List<GetTestSuiteResponse> GetTestSuiteForTestPlan(Guid testPlanId)
        {
            var testSuites = Context.TestSuites.Where(x => x.TestPlanId == testPlanId).ToList();
            return testSuites.Select(x => _mapper.Map<GetTestSuiteResponse>(x)).ToList();
        }

        public async Task<GetTestSuiteWithTestsResponse> GetTestSuiteWithTests(Guid id)
        {
            var testSuite = await Context.TestSuites.FindAsync(id);
            if (testSuite == null)
                return null;

            return _mapper.Map<GetTestSuiteWithTestsResponse>(testSuite);
        }

        public bool IsTestSuiteExist(Guid id)
        {
            return Context.TestSuites.Any(x => x.Id == id);
        }
    }
}
