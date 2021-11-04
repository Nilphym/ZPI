using Funtest.Services.Interfaces;
using Funtest.TransferObject.Auth.Requests;
using Funtest.TransferObject.Email.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Funtest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public readonly IAuthService _authService;
        public readonly IEmailService _emailService;

        public AuthController(IAuthService authService, IEmailService emailService)
        {
            _authService = authService;
            _emailService = emailService;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult> Login(LoginRequest loginRequest)
        {
            var token = await _authService.Login(loginRequest);
            if (token != null)
                return Ok(token);

            return Unauthorized();
        }

        [HttpPost("registration")]
        public ActionResult UserRegistration(DataToInvitationLinkRequest request)
        {
            var result = _emailService.SendInvitationLink(request);
            if (result)
                return Ok();
            return Problem("Problem with sending invitation email.");
        }

    }
}
