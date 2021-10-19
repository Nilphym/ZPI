using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.TestProcedure.Requests;
using Funtest.TransferObject.TestProcedure.Responses;

namespace Funtest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestProceduresController : ControllerBase
    {
        private readonly ITestProcedureService _testProcedureService;

        public TestProceduresController(ITestProcedureService testProcedureService)
        {
            _testProcedureService = testProcedureService;
        }

        [HttpPost]
        public async Task<ActionResult> PostTestProcedure(AddTestProcedureRequest testProcedure)
        {
            var correctResult = await _testProcedureService.AddTestProcedure(testProcedure);

            if (correctResult)
                return Ok();

            return Problem("Problem with saving an object in the database");
        }

        // GET: api/TestProcedures/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GetTestProcedureResponse>> GetTestProcedure(Guid id)
        {
            var testProcedure = await _testProcedureService.GetTestProcedureById(id);
            if (testProcedure == null)
            {
                return NotFound("Object with the given id doesn't exist.");
            }

            return Ok(testProcedure);
        }
    }
}
