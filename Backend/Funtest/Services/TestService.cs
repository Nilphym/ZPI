using AutoMapper;
using Data.Models;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.Test.Requests;
using Funtest.TransferObject.Test.Response;
using System;
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

        public GetTestResponse GetTestById(Guid id)
        {
            var test = Context.Tests.Where(x => x.Id == id).FirstOrDefault();
            return _mapper.Map<GetTestResponse>(test);
        }
    }
}
