using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Funtest.Interfaces;
using Funtest.TransferObject.Steps;
using System;
using Funtest.Services.Interfaces;

namespace Funtest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StepsController : ControllerBase
    {
        private readonly IStepService _stepService;
        private readonly ITestProcedureService _testProcedureService;

        public StepsController(IStepService stepService, ITestProcedureService testProcedureService)
        {
            _stepService = stepService;
            _testProcedureService = testProcedureService;
        }

        [HttpPost]
        public async Task<ActionResult> AddStep(StepsAddStep step)
        {
            var correctResult = await _stepService.AddStep(step);

            if (correctResult)
                return Ok();

            return Problem("Problem with saving an object in the database");
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<StepsGetStep>>> GetSteps()
        {
            return Ok(_stepService.GetAllSteps());
        }

        [HttpGet("{testProcedureId}")]
        public async Task<ActionResult<IEnumerable<StepsGetStep>>> GetStepsForTestProcedure([FromRoute] Guid testProcedureId)
        {
            if (_testProcedureService.IsTestProcedureExist(testProcedureId))
                return Ok(_stepService.GetAllStepsForTestProcedure(testProcedureId));
            return BadRequest("Test procedure with the given id doesn't exist.");
        }
        /*
                       // GET: api/Steps/5
                       [HttpGet("{id}")]
                       public async Task<ActionResult<Step>> GetStep(Guid id)
                       {
                           var step = await _context.Steps.FindAsync(id);

                           if (step == null)
                           {
                               return NotFound();
                           }

                           return step;
                       }

                       // PUT: api/Steps/5
                       // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
                       [HttpPut("{id}")]
                       public async Task<IActionResult> PutStep(Guid id, Step step)
                       {
                           if (id != step.Id)
                           {
                               return BadRequest();
                           }

                           _context.Entry(step).State = EntityState.Modified;

                           try
                           {
                               await _context.SaveChangesAsync();
                           }
                           catch (DbUpdateConcurrencyException)
                           {
                               if (!StepExists(id))
                               {
                                   return NotFound();
                               }
                               else
                               {
                                   throw;
                               }
                           }

                           return NoContent();
                       }

                       // DELETE: api/Steps/5
                       [HttpDelete("{id}")]
                       public async Task<IActionResult> DeleteStep(Guid id)
                       {
                           var step = await _context.Steps.FindAsync(id);
                           if (step == null)
                           {
                               return NotFound();
                           }

                           _context.Steps.Remove(step);
                           await _context.SaveChangesAsync();

                           return NoContent();
                       }

                       private bool StepExists(Guid id)
                       {
                           return _context.Steps.Any(e => e.Id == id);
                       }*/
    }
}
