using Data.Roles;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.Admin.Requests;
using Funtest.TransferObject.Product.Requests;
using Funtest.TransferObject.Product.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Funtest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IAccountService _adminService;

        public ProductsController(IProductService productService, IAccountService adminService)
        {
            _productService = productService;
            _adminService = adminService;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> CreateNewProject(CreateNewProductRequest request)
        {
            var isName = _productService.IsProductNameUnique(request.Name);
            if (!isName)
                return Conflict("The product name must be unique.");

            var result = await _productService.CreateNewProduct(request);
            if (!result)
                return Problem("Problem with creating new product");

            var product = _productService.FindByName(request.Name);
            var userName = await _adminService.AddNewUser(new AddNewUserRequest()
            {
                Role = Roles.ProjectManager,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Password = request.Password,
                Email = request.Email,
                ProductId = product.Id
            }, product);

            if (userName == null)
                return Conflict("Problem with creating Project Manager. Try again.");
            return Ok(userName);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetProductResponse>> GetProduct([FromRoute] Guid id)
        {
            var product = await _productService.GetProductResponse(id);

            return product != null ? Ok(product) : NotFound();
        }
    }
}
