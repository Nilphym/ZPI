using Data.Models;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.Auth.Requests;
using Funtest.TransferObject.Auth.Responses;
using System;
using System.Threading.Tasks;

namespace Funtest.Services
{
    public class AuthService : Service, IAuthService
    {
        public readonly IJWTService _jwtService;


        public AuthService(IServiceProvider serviceProvider, IJWTService jwtService) : base(serviceProvider)
        {
            _jwtService = jwtService;
        }

        public async Task<User> FindUser(string email)
        {
           return await UserManager.FindByEmailAsync(email);
        }

        public async Task<LoginResponse> Login(LoginRequest request)
        {
            var user = await UserManager.FindByNameAsync(request.Email);

            if (user == null)
                return null;

            var result = SignInManager.CheckPasswordSignInAsync(user, request.Password, false).Result;

            if (!result.Succeeded)
                return null;
            var token = await _jwtService.GenerateJWToken(user);
            var response = new LoginResponse() { Token = token };
            return response;
        }
    }
}
