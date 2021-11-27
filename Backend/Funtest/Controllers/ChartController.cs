using Data.Roles;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.Chart.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Funtest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = Roles.ProjectManager +", " + Roles.Tester + ", " + Roles.Developer)]
    public class ChartController : ControllerBase
    {
        private IChartService _chartService;
        private IProductService _productService;
        public ChartController(IChartService chartService, IProductService productService)
        {
            _chartService = chartService;
            _productService = productService;
        }

        [HttpGet]
        public async Task<ActionResult<ChartResponse>> GetChartForProductAsync() {

            var principal = HttpContext.User;
            var productId = Guid.Parse(principal.Claims.Where(x => x.Type == "productId").Select(x => x.Value).FirstOrDefault());

            var product = await _productService.GetProduct(productId);
            return _chartService.GetDataToChart(product);
        }
    }
}
