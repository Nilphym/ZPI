using AutoMapper;
using Data.Models;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.Admin.Requests;
using System;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Funtest.Services
{
    public class AccountService : Service, IAccountService
    {
        private readonly IMapper _mapper;
        public AccountService(IServiceProvider serviceProvider, IMapper mapper) : base(serviceProvider)
        {
            _mapper = mapper;
        }

        private string CreateUserName(User user, Product product)
        {
            var userName = $"{user.FirstName}.{user.LastName}";
            userName = userName.Normalize(NormalizationForm.FormD);
            var chars = userName.Where(c => CharUnicodeInfo.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark).ToArray();
            userName = new string(chars).Normalize(NormalizationForm.FormC);


            var duplicat = Context.Users.Where(x => x.FirstName == user.FirstName && user.LastName == x.LastName && x.ProductId == product.Id).Count();

            if (duplicat > 0)
            {
                userName += duplicat;
            }

            return $"{userName.ToLower()}@{product.Name.ToLower()}.pl";
        }

        public async Task<string> AddNewUser(AddNewUserRequest request, Product product)
        {
            var user = _mapper.Map<User>(request);
            user.Id = Guid.NewGuid().ToString();
            user.Email = request.Email;
            user.UserName = CreateUserName(user, product);
            user.ProductId = request.ProductId;

            var result = await UserManager.CreateAsync(user, request.Password);
            if (!result.Succeeded)
                return null;

            await UserManager.AddToRoleAsync(user, request.Role);
            return user.UserName;
        }
    }
}
