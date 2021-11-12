namespace Funtest.TransferObject.Account.Requests
{
    public class RegisterInvitatedUserRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string EmailEncoded { get; set; }
        public string ProductIdEncoded { get; set; }
    }
}
