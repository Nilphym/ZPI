using AutoMapper;
using Data.Models;
using Data.Roles;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.Admin.Requests;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Funtest.Services
{
    public class AdminService : Service, IAdminService
    {
        private readonly IMapper _mapper;
        public AdminService(IServiceProvider serviceProvider, IMapper mapper) : base(serviceProvider)
        {
            _mapper = mapper;
        }

        public Task<bool> AddNewUser(AddNewUserRequest request)
        {
            return null;
        }

        /// <summary>
        /// TO DO: Jak zostanie czas przydałoby sie ogarnąc serwis do zwracania błędów z komunikatami
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public async Task<bool> AddProjectManager(AddProjectManageRequest request)
        {
            var isUnique = Context.Users.Select(x => x.Email).Where(x => x == request.Email).Count();
            if (isUnique != 0)
                return false;

            var user = _mapper.Map<User>(request);
            user.Id = Guid.NewGuid().ToString();
            user.UserName = request.Email;//mail zrobic z workspacem

            var result = await UserManager.CreateAsync(user, request.Password);
            if (!result.Succeeded)
                return false;

            await UserManager.AddToRoleAsync(user, request.Role);
            return true;
        }
    }
}
