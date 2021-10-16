using Data;
using System;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Identity;
using Data.Models;

namespace Funtest.Services
{
    public class Service
    {
        public DatabaseContext Context { get; }
        public UserManager<User> UserManager { get; }
        public SignInManager<User> SignInManager { get; }

        public Service(IServiceProvider serviceProvider)
        {
            Context = serviceProvider.GetService<DatabaseContext>();
            UserManager = serviceProvider.GetService<UserManager<User>>();
            SignInManager = serviceProvider.GetService<SignInManager<User>>();
        }
    }
}
