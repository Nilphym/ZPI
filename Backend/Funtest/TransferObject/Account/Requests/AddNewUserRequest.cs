using System;

namespace Funtest.TransferObject.Admin.Requests
{
    public class AddNewUserRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string Email { get; set; }
        public Guid ProductId{ get; set; }
    }
}
