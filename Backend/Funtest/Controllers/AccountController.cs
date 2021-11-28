using Data.Roles;
using Funtest.Security;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.Account.Requests;
using Funtest.TransferObject.Email.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
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
        public readonly IAuthService _authService;
        public readonly IErrorService _errorService;

        public AccountController(IEmailService emailService, IErrorService errorService, IAuthService authService, IAccountService accountservice, IProductService productService)
        {
            _emailService = emailService;
            _errorService = errorService;
            _authService = authService;
            _accountservice = accountservice;
            _productService = productService;
        }

        [HttpPost("invitation")]
        [Authorize(Roles = Roles.ProjectManager)]
        public async Task<ActionResult> UserInvitationAsync(DataToInvitationLinkRequest request)
        {
            var principal = HttpContext.User;
            var productName = principal.Claims.Where(x => x.Type == "productName").Select(x => x.Value).FirstOrDefault();

            var result = await _emailService.SendInvitationLinkAsync(request, productName);
            if (result)
                return Ok();
            return Problem("Problem with sending invitation email.");
        }

        [HttpPost("registration")]
        [AllowAnonymous]
        public async Task<ActionResult<string>> UserRegistration(RegisterInvitatedUserRequest request)
        {
            var productIdDecoded = Guid.Parse(SecureSensitiveData.Decode(request.ProductIdEncoded));
            var isProductExist = _productService.IsProductExist(productIdDecoded);

            if (!isProductExist)
                return NotFound("Product with given id doesn't exist.");

            var product = await _productService.GetProduct(productIdDecoded);
            var userName = await _accountservice.AddInvitedUser(request, product);

            if (userName != null)
                return Ok(userName);
            return Problem("Problem with creating new user.");
        }

        [HttpPost("forgotPassword")]
        [AllowAnonymous]
        public async Task<ActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
        {
            var result = await _accountservice.ForgotPassword(request);

            if (result)
                return Ok();
            return Conflict("Problem with sending email.");
        }

        [HttpPut("resetPassword")]
        [AllowAnonymous]
        public async Task<ActionResult> ResetForgotPassword([FromBody] ResetPasswordRequest request)
        {
            var result = await _accountservice.ResetPassword(request);

            if (result)
                return Ok();
            return Conflict("Problem with saving new password.");
        }

        [HttpPut("deleteUser")]
        [Authorize(Roles = Roles.ProjectManager)]
        public async Task<ActionResult> DeleteUser(RemoveAccountRequest request)
        {
            var principal = HttpContext.User;
            var pmId = principal.Claims.Where(x => x.Type == "userId").Select(x => x.Value).FirstOrDefault();

            var userToRemove = await _authService.FindUserByUserName(request.UserName);
            if (userToRemove == null)
                return NotFound("User with given user name doesn't exist.");
            var result = await _accountservice.RemoveAccount(request, pmId);

            if (!result)
                return Conflict("You can't do this.");

            var userRole = await _authService.UserRole(userToRemove);
            if (userRole == Roles.Developer)
                result = result && await _errorService.ResignFromEverErrors(userToRemove.Id);

            if (result)
                return Ok();
            return Conflict("Something goes wrong!");
        }
    }
}
