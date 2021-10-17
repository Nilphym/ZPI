using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Data;
using Data.Models;

namespace Funtest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestPlansController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public TestPlansController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/TestPlans
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TestPlan>>> GetTestPlans()
        {
            return await _context.TestPlans.ToListAsync();
        }

        // GET: api/TestPlans/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TestPlan>> GetTestPlan(Guid id)
        {
            var testPlan = await _context.TestPlans.FindAsync(id);

            if (testPlan == null)
            {
                return NotFound();
            }

            return testPlan;
        }

        // PUT: api/TestPlans/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTestPlan(Guid id, TestPlan testPlan)
        {
            if (id != testPlan.Id)
            {
                return BadRequest();
            }

            _context.Entry(testPlan).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TestPlanExists(id))
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

        // POST: api/TestPlans
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TestPlan>> PostTestPlan(TestPlan testPlan)
        {
            _context.TestPlans.Add(testPlan);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTestPlan", new { id = testPlan.Id }, testPlan);
        }

        // DELETE: api/TestPlans/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTestPlan(Guid id)
        {
            var testPlan = await _context.TestPlans.FindAsync(id);
            if (testPlan == null)
            {
                return NotFound();
            }

            _context.TestPlans.Remove(testPlan);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TestPlanExists(Guid id)
        {
            return _context.TestPlans.Any(e => e.Id == id);
        }
    }
}
