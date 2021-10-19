using Data.Roles;

namespace Funtest.TransferObject.Auth.Responses
{
    public class LoginResponse
    {
        public string Token { get; set; }
        public string Role { get; set; }
    }
}
