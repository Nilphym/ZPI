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
            var response = await _authService.Login(loginRequest);

            return response != null ? Ok(response) : Conflict("Email or password is incorrect.");
        }
    }
}
