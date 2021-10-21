using AutoMapper;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.TestSuite.Responses;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Funtest.Services
{
    public class TestSuiteService : Service, ITestSuiteService
    {
        public readonly IMapper _mapper;

        public TestSuiteService(IServiceProvider serviceProvider, IMapper mapper) : base(serviceProvider)
        {
            _mapper = mapper;
        }

        public List<GetTestSuiteResponse> GetAllTestSuites()
        {
            return Context.TestSuites.AsQueryable().Select(x => _mapper.Map<GetTestSuiteResponse>(x)).ToList();
        }
    }
}
