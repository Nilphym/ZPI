using Funtest.Services.Interfaces;
using Funtest.TransferObject.Admin.Requests;
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

        public AuthController(IAuthService authService)
        {
            _authService = authService;
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
    }
}
