using Funtest.Services.Interfaces;
using Funtest.TransferObject.Admin.Requests;
using Funtest.TransferObject.Email.Requests;
using Microsoft.AspNetCore.Mvc;
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
        public ActionResult UserInvitation(DataToInvitationLinkRequest request)
        {
            var result = _emailService.SendInvitationLink(request);
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
    }
}
