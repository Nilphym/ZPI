using Funtest.TransferObject.Product.Requests;
using System.Threading.Tasks;

namespace Funtest.Services.Interfaces
{
    public interface IProductService
    {
        Task<bool> CreateNewProduct(CreateNewProductRequest request, string projectManagerId);
    }
}
