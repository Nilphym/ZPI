using System.ComponentModel.DataAnnotations;

namespace Funtest.TransferObject.Account.Requests
{
    public class ForgotPasswordRequest
    {
        public string Email { get; set; }
    }
}
