using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Data.Models;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.Attachment.Responses;
using Funtest.TransferObject.Attachment.Requests;
using Data.Roles;
using Microsoft.AspNetCore.Authorization;

namespace Funtest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = Roles.Tester + ", " + Roles.Developer+ ", " + Roles.ProjectManager)]
    public class AttachmentsController : ControllerBase
    {
        private readonly IAttachmentService _attachmentService;
        private readonly IErrorService _errorService;

        public AttachmentsController(IAttachmentService attachmentService, IErrorService errorService)
        {
            _attachmentService = attachmentService;
            _errorService = errorService;
        }

        [HttpGet("error/{id}")]
        public ActionResult<List<GetAttachmentResponse>> GetAttachmentsForError([FromRoute] Guid id)
        {
            if (_errorService.IsErrorExist(id))
                return Ok(_attachmentService.GetAttachmentsForError(id));
            return NotFound("Object with given id doesn't exist");
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Attachment>> GetAttachment(Guid id)
        {
            var attachment = await _attachmentService.GetAttachment(id);
            return attachment == null ? NotFound("Attachment with the given id doesn't exist.") : Ok(attachment);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAttachment([FromRoute] Guid id)
        {
            var result = await _attachmentService.DeleteAttachment(id);
            if (result)
                return Ok();
            return NotFound("Object with given id doesn't exist");
        }

        [HttpPost]
        public async Task<ActionResult<Attachment>> PostAttachment(AddAttachmentRequest request)
        {
            var isErrorExist = _errorService.IsErrorExist(request.ErrorId);
            if (!isErrorExist)
                return NotFound("Error with given id doesn't exist.");

            var attachmentId = await _attachmentService.AddNewAttachment(request);
            if (attachmentId != null)
                return Ok(attachmentId);

            return NotFound("Problem with saving object in database!");
        }
    }
}
