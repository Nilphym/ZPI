using AutoMapper;
using Data.Models;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.Attachment.Requests;
using Funtest.TransferObject.Attachment.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<Guid?> AddNewAttachment(AddAttachmentRequest request)
        {
            var attachment = _mapper.Map<Attachment>(request);
            attachment.Id = Guid.NewGuid();
            await Context.Attachments.AddAsync(attachment);

            if (await Context.SaveChangesAsync() == 0)
                return null;

            return attachment.Id;
        }

        public async Task<bool> DeleteAttachment(Guid id)
        {
            var attachment = await Context.Attachments.FindAsync(id);
            if (attachment == null)
                return false;

            Context.Attachments.Remove(attachment);

            if (await Context.SaveChangesAsync() == 0)
                return false;

            return true;
        }

        public async Task<GetAttachmentResponse> GetAttachment(Guid id)
        {
            return _mapper.Map<GetAttachmentResponse>(await Context.Attachments.FindAsync(id));
        }

        public List<GetAttachmentResponse> GetAttachmentsForError(Guid errorId)
        {
            var errors = Context.Attachments.Where(x => x.ErrorId == errorId).ToList();
            return errors.Select(x => _mapper.Map<GetAttachmentResponse>(x)).ToList();
        }
    }
}
