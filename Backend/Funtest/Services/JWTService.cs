using Data.Models;
using Funtest.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Funtest.Services
{
    public class JWTService : Service, IJWTService
    {
        public readonly IJWTService _JWThService;
        private IConfiguration _configuration;


        public JWTService(IServiceProvider serviceProvider, IConfiguration configuration) : base(serviceProvider)
        {
            _configuration = configuration;
        }

        public async Task<string> GenerateJWToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>{
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("userId", user.Id),
                new Claim("userData", $"{user.FirstName} {user.LastName}"),
                new Claim("productId", user.ProductId.ToString())
            };

            var userClaims = await UserManager.GetClaimsAsync(user);
            claims.AddRange(userClaims);

            var userRoles = await UserManager.GetRolesAsync(user);
            claims.AddRange(userRoles.Select(role => new Claim("role", role)));

            var token = new JwtSecurityToken(
            _configuration["Jwt:Issuer"],
            _configuration["Jwt:Issuer"],
            claims,
            expires: DateTime.Now.AddDays(1),
            signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
