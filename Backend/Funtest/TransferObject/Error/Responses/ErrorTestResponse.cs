using Funtest.TransferObject.Test.Response;
using System;

namespace Funtest.TransferObject.Error.Response
{
    public class ErrorTestResponse
    {
        public GetTestIdentityInformationResponse Test;
        public string Proconditions { get; set; }
        public int MyProperty { get; set; }
    }
}
