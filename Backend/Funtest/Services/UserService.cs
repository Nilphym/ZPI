using Data.Models;
using Funtest.Services.Interfaces;
using System;
using System.Threading.Tasks;

namespace Funtest.Services
{
    public class UserService : Service, IUserService
    {
        public UserService(IServiceProvider service) : base(service)
        { }

        public async Task<bool> IsUserExist(string id)
        {
            var user = await Context.Users.FindAsync(id);
            return user != null ? true : false;
        }
    }
}
