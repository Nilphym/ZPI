namespace Funtest.TransferObject.Account.Requests
{
    public class ResetPassword
    {
        public string Password { get; set; }
        public string Confirmed { get; set; }
        public string UserId { get; set; }
    }
}
