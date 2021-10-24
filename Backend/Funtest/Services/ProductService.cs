using AutoMapper;
using Data.Models;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.Product.Requests;
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

        public async Task<bool> CreateNewProduct(CreateNewProductRequest request, string projectManagerId)
        {
            Product product = new Product()
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
                Version = FIRST_VERSION
            };

            Context.Products.Add(product);
            if (await Context.SaveChangesAsync() == 0)
                return false;
            return true;
        }
    }
}
