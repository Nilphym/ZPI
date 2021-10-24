using AutoMapper;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.Attachment.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Funtest.Services
{
    public class AttachmentService : Service, IAttachmentService
    {
        private readonly IMapper _mapper;

        public AttachmentService(IServiceProvider serviceProvider, IMapper mapper) : base(serviceProvider)
        {
            _mapper = mapper;
        }

        public Task<bool> AddNewAttachment(AddAttachmentRequest request)
        {
            //_mapper.Map<Attachment>()
            throw new NotImplementedException();

        }
    }
}
