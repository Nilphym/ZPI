using AutoMapper;
using Data.Models;
using Funtest.Security;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.Account.Requests;
using Funtest.TransferObject.Email.Requests;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using MimeKit;
using System;
using System.Threading.Tasks;
using System.Web;

namespace Funtest.Services
{
    public class EmailService : Service, IEmailService
    {
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        public EmailService(IServiceProvider service, IMapper mapper, IConfiguration configuration) : base(service)
        {
            _mapper = mapper;
            _configuration = configuration;
        }

        private string CreateInvitationUrl(string baseUrl, string role, Guid productId, string email)
        {
            var productIdEncoded = SecureSensitiveData.Encode(productId.ToString());
            var emailEncoded = SecureSensitiveData.Encode(email.ToString());

            return $"{baseUrl}/{role}/{productIdEncoded}/{emailEncoded}";
        }

        public async Task<bool> SendInvitationLinkAsync(DataToInvitationLinkRequest request, string productName)
        {
            var baseUrl = _configuration["EmailService:invitationLink"];

            var mailMessage = new MimeMessage();
            mailMessage.From.Add(new MailboxAddress(_configuration["EmailService:name"], _configuration["EmailService:email"]));
            mailMessage.To.Add(new MailboxAddress(request.Email, request.Email));
            mailMessage.Subject = "Invitation link, Funtest";

            var builder = new BodyBuilder();
            builder.HtmlBody = string.Format(
                @$"<h2>Hello in the Funtest Community!</h2>
                <p>Your company's project manager has invited you to join as a {request.Role} of the {productName} product in the Funtest system.
                Accept this invitation to get access today and help us in our journey to a bugless World!</p>
                <a href={CreateInvitationUrl(baseUrl, request.Role, request.ProductId, request.Email)}>Click here to register!</a>
                <hr/>
                <p>Best regards,</p>
                <p>{_configuration["EmailService:name"]}</p>"
            );
            mailMessage.Body = builder.ToMessageBody();

            return await Send(mailMessage);
        }

        private async Task<bool> Send(MimeMessage message)
        {
            using (var smtpClient = new SmtpClient())
            {
                try
                {
                    smtpClient.ServerCertificateValidationCallback = (s, c, h, e) => true;
                    smtpClient.Connect(_configuration["EmailService:host"], Int32.Parse(_configuration["EmailService:port"]), false);
                    smtpClient.Authenticate(_configuration["EmailService:email"], _configuration["EmailService:password"]);
                    smtpClient.Send(message);
                    smtpClient.Disconnect(true);
                }
                catch
                {
                    return false;
                }
            }
            return true;
        }

        public async Task<bool> SendResetPasswordMail(User user, string encodedToken, string baseUrl)
        {
            baseUrl = _configuration["EmailService:passwordReset"];
            string url = $"{baseUrl}/{user.Id}/{encodedToken}";

            var mailMessage = new MimeMessage();
            mailMessage.From.Add(new MailboxAddress(_configuration["EmailService:name"], _configuration["EmailService:email"]));
            mailMessage.To.Add(new MailboxAddress(user.Email, user.Email));
            mailMessage.Subject = "Reset password, Funtest";

            var builder = new BodyBuilder();
            builder.HtmlBody = string.Format(
                @$"<h2>Hello in Funtest Community. </h2>
                <p>Click link to reset pssword.</p>
                <a href='{url}'>Reset password link</a>
                <hr/>
                <p>Best regards,</p>
                <p>{_configuration["EmailService:name"]}</p>");
            mailMessage.Body = builder.ToMessageBody();

            var result = await Send(mailMessage);

            if (result)
                return true;

            return false; ;
        }
    }
}
