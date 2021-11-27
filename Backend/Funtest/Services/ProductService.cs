using AutoMapper;
using Data.Models;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.Product.Requests;
using Funtest.TransferObject.Product.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Funtest.Services
{
    public class ProductService : Service, IProductService
    {
        private static int FIRST_VERSION = 1;

        private readonly IMapper _mapper;

        public ProductService(IServiceProvider serviceProvider, IMapper mapper) : base(serviceProvider)
        {
            _mapper = mapper;
        }

        public async Task<bool> CreateNewProduct(CreateNewProductRequest request)
        {
            Product product = new Product()
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
                Version = FIRST_VERSION,
                CreationDate = DateTime.Now
            };

            Context.Products.Add(product);
            if (await Context.SaveChangesAsync() == 0)
                return false;
            return true;
        }

        public Product FindByName(string productName)
        {
            return Context.Products.Where(x => x.Name == productName).FirstOrDefault();
        }

        public List<GetAllUsersInProduct> GetAllUsersInProduct(Guid productId)
        {
            var users = Context.Users.Where(x => x.ProductId == productId && !x.IsDeleted).ToList();
            return users.Select(x => _mapper.Map<GetAllUsersInProduct>(x)).ToList();
        }

        public async Task<Product> GetProduct(Guid id)
        {
            return await Context.Products.FindAsync(id);
        }

        public async Task<GetProductResponse> GetProductResponse(Guid id)
        {
            var product = await Context.Products.FindAsync(id);
            return _mapper.Map<GetProductResponse>(product);
        }

        public bool IsProductExist(Guid id)
        {
            return Context.Products.Any(x => x.Id == id);
        }

        public bool IsProductNameUnique(string productName)
        {
            return !Context.Products.Any(x => x.Name == productName);
        }
    }
}
