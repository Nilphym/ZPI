using Data.Models;
using Funtest.TransferObject.Steps;
using System.Linq;
using System.Threading.Tasks;

namespace Funtest.Interfaces
{
    public interface IStepService
    {
        Task<bool> AddStep(StepsAddStep step);
        IQueryable<StepsGetStep> GetAll();
    }
}
