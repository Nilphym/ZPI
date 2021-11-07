using System;

namespace Funtest.TransferObject.Product.Responses
{
    public class GetProductResponse
    {
        public Guid Id { get; set; }
        public int Version { get; set; }
        public string Name { get; set; }
    }
}
