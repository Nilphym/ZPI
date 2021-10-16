﻿using Funtest.Services.Interfaces;
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

        public async Task<LoginResponse> Login(LoginRequest request)
        {
            var user = await UserManager.FindByEmailAsync(request.Email);

            if (user == null)
                return null;

            var result = SignInManager.CheckPasswordSignInAsync(user, request.Password, false).Result;

            if (!result.Succeeded)
                return null;
            var token = await _jwtService.GenerateJWToken(user);
            var response = new LoginResponse() { Token = token};
            return response;
        }
    }
}