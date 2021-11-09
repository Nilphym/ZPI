using AutoMapper;
using Data.Models;
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

        private string CreateInvitationUrl(string baseUrl, string role, Guid productId)
        {
            return $"{baseUrl}/{role}/{productId}";
        }

        public async Task<bool> SendInvitationLinkAsync(DataToInvitationLinkRequest request)
        {
            var mailMessage = new MimeMessage();
            mailMessage.From.Add(new MailboxAddress(_configuration["EmailService:name"], _configuration["EmailService:email"]));
            mailMessage.To.Add(new MailboxAddress(request.Email, request.Email));
            mailMessage.Subject = "Invitation link, Funtest";

            var builder = new BodyBuilder();
            builder.HtmlBody = string.Format(
                @$"<h2>Hello in Funtest Community. </h2>
                <p>{_configuration["EmailService:invitationMessage"]}</p>
                <a href={CreateInvitationUrl("url", request.Role, request.ProductId)}>Click here to register</a>
                <p>Best regards, {_configuration["EmailService:name"]}"
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

        public async Task<bool> SendResetPasswordMail(User user, string passwordResetToken, string baseUrl)
        {
            var encodedToken = HttpUtility.UrlEncode(passwordResetToken);
            baseUrl = "https://localhost:44360/api/auth";
            string url = $"{baseUrl}/{user.Id}/{encodedToken}";

            var mailMessage = new MimeMessage();
            mailMessage.From.Add(new MailboxAddress(_configuration["EmailService:name"], _configuration["EmailService:email"]));
            mailMessage.To.Add(new MailboxAddress(user.Email, user.Email));
            mailMessage.Subject = "Reset password, Funtest";

            var builder = new BodyBuilder();
            builder.HtmlBody = string.Format(
                @$"<h2>Hello in Funtest Community. </h2>
                <p>Click in lint to reset pssword.</p>
                <a href='{url}'>REser password link</a>
                <p>Best regards, {_configuration["EmailService:name"]}"
            );
            mailMessage.Body = builder.ToMessageBody();

            var result = await Send(mailMessage);

            if (result)
                return true;

            return false; ;
        }
    }
}
