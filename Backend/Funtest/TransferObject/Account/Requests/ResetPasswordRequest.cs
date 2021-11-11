namespace Funtest.TransferObject.Account.Requests
{
    public class ResetPasswordRequest
    {
        public string Password { get; set; }
        public string ConfirmedPassword { get; set; }
        public string UserId { get; set; }
        public string PasswordResetToken { get; set; }
    }
}
