using Data.Models;
using Funtest.TransferObject.Product.Requests;
using Funtest.TransferObject.Product.Responses;
using System;
using System.Threading.Tasks;

namespace Funtest.Services.Interfaces
{
    public interface IProductService
    {
        Task<Product> GetProduct(Guid id);
        Task<GetProductResponse> GetProductResponse(Guid id); 
        bool IsProductNameUnique(string productName);
        Task<bool> CreateNewProduct(CreateNewProductRequest request);
        bool IsProductExist(Guid id);
        Product FindByName(string productName);
    }
}
