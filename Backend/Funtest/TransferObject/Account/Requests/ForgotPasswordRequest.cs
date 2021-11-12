using System.ComponentModel.DataAnnotations;

namespace Funtest.TransferObject.Account.Requests
{
    public class ForgotPasswordRequest
    {
        public string UserName { get; set; }
        public string Email { get; set; }
    }
}
