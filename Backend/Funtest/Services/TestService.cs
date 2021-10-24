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

        public async Task<bool> EditTest(Guid id, EditTestRequest request)
        {
            var test = await Context.Tests.FindAsync(id);
            test.Name = request.Name;

            Context.Tests.Update(test);

            if (await Context.SaveChangesAsync() == 0)
                return false;
            return true;
        }

        public async Task<GetTestResponse> GetTestById(Guid id)
        {
            var test = await Context.Tests.FindAsync(id);
            return _mapper.Map<GetTestResponse>(test);
        }

        public bool IsTestExist(Guid id)
        {
            return Context.Tests.Any(x => x.Id == id);
        }
    }
}
