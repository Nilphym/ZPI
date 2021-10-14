using Data;
using System;
using Microsoft.Extensions.DependencyInjection;


namespace Funtest.Services
{
    public class Service
    {
        public DatabaseContext Context { get; }

        public Service(IServiceProvider serviceProvider)
        {
            Context = serviceProvider.GetService<DatabaseContext>();
        }
    }
}
