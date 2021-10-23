using Data.Roles;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.Admin.Requests;
using Funtest.TransferObject.Product.Requests;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Funtest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IAdminService _adminService;
        private readonly IAuthService _authService;

        public ProductsController(IProductService productService, IAdminService adminService, IAuthService authService)
        {
            _productService = productService;
            _adminService = adminService;
            _authService = authService;
        }

        [HttpPost]
        public async Task<ActionResult> CreateNewProject(CreateNewProductRequest request)
        {
             var userResult = await _adminService.AddProjectManager(new AddNewUserRequest()
            {
                Role = Roles.ProjectManager,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Password = request.Password,
                Email = request.Email
            });

            if (!userResult)
                return Problem("Problem with creating Project Manager. Try again.");

            var projectManagerId = (await _authService.FindUser(request.Email)).Id;
            var result = await _productService.CreateNewProduct(request, projectManagerId);

            if (result)
                return Ok();
            return Problem("Problem with saving changes in database.");
        }
    }
}
