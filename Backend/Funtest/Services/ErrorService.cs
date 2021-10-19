using AutoMapper;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.Error.Responses;
using System;
using System.Threading.Tasks;

namespace Funtest.Services
{
    public class ErrorService : Service, IErrorService
    {
        public readonly IMapper _mapper;

        public ErrorService(IServiceProvider serviceProvider, IMapper mapper) : base(serviceProvider)
        {
            _mapper = mapper;
        }

        public async Task<GetErrorResponse> GetErrorById(Guid id)
        {
            var error = await Context.Errors.FindAsync(id);
           return  _mapper.Map<GetErrorResponse>(error);
        }
    }
}
