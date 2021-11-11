using Data.Roles;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.Account.Requests;
using Funtest.TransferObject.Admin.Requests;
using Funtest.TransferObject.Email.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Funtest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        public readonly IEmailService _emailService;
        public readonly IAccountService _accountservice;
        public readonly IProductService _productService;

        public AccountController(IEmailService emailService, IAccountService accountservice, IProductService productService)
        {
            _emailService = emailService;
            _accountservice = accountservice;
            _productService = productService;
        }

        [HttpPost("invitation")]
        [Authorize(Roles = Roles.ProjectManager)]
        public async Task<ActionResult> UserInvitationAsync(DataToInvitationLinkRequest request)
        {
            var result = await _emailService.SendInvitationLinkAsync(request);
            if (result)
                return Ok();
            return Problem("Problem with sending invitation email.");
        }

        [HttpPost("registration")]
        public async Task<ActionResult<string>> UserRegistration(AddNewUserRequest request)
        {
            var product = await _productService.GetProduct(request.ProductId);
            var userName = await _accountservice.AddNewUser(request, product);

            if (userName != null)
                return Ok(userName);
            return Problem("Problem with creating nre user.");
        }

        [HttpPost("forgotPassword")]
        public async Task<ActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
        {
            var result = await _accountservice.ForgotPassword(request);
            
            if (result)
                return Ok();
            return Conflict("Problem with sending email.");
        }

        [HttpPut("resetPassword")]
        public async Task<ActionResult> ResetForgotPassword([FromBody] ResetPasswordRequest request)
        {
            var result = await _accountservice.ResetPassword(request);

            if (result)
                return Ok();
            return Conflict("Problem with saving new password.");
        }
    }
}
