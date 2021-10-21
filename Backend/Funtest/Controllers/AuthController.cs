using Funtest.Services.Interfaces;
using Funtest.TransferObject.Auth.Requests;
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

        [AllowAnonymous]
        [HttpGet("login")]
        public async Task<ActionResult> Login(LoginRequest loginRequest)
        {
            var token = await _authService.Login(loginRequest);
            if (token != null)
                return Ok(token);

            return Unauthorized();
        }
    }
}
