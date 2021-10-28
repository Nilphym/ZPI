using Data.Models;
using Data.Roles;
using Funtest.Services.Interfaces;
using System;
using System.Threading.Tasks;

namespace Funtest.Services
{
    public class UserService : Service, IUserService
    {
        public UserService(IServiceProvider service) : base(service)
        { }

        public async Task<bool> IsDeveloperExist(string developerId)
        {
            var user = await Context.Users.FindAsync(developerId);
            if (user == null)
                return false;

            return (await UserManager.GetRolesAsync(user))[0] == Roles.Developer;
        }

        public async Task<bool> IsUserExist(string id)
        {
            var user = await Context.Users.FindAsync(id);
            return user != null ? true : false;
        }
    }
}
