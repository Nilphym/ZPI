using AutoMapper;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.Email.Requests;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using MimeKit;
using System;

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

        public bool SendInvitationLink(DataToInvitationLinkRequest request)
        {
            var mailMessage = new MimeMessage();
            mailMessage.From.Add(new MailboxAddress(_configuration["EmailService:name"], _configuration["EmailService:email"]));
            mailMessage.To.Add(new MailboxAddress(request.Email, request.Email));
            mailMessage.Subject = "Invitation link, Funtest";

           // var builder = new BodyBuilder();
           // builder.TextBody =
            mailMessage.Body = new TextPart("plain")
            {
                Text = "Hello in Funtest Community",
               
            };
           // mailMessage.HtmlBody = string.Format(@"<link href='dfdsewrewrw'");

            using (var smtpClient = new SmtpClient())
            {
                try
                {
                    smtpClient.ServerCertificateValidationCallback = (s, c, h, e) => true;
                    smtpClient.Connect(_configuration["EmailService:host"], Int32.Parse(_configuration["EmailService:port"]), false);
                    smtpClient.Authenticate(_configuration["EmailService:email"], _configuration["EmailService:password"]);
                    smtpClient.Send(mailMessage);
                    smtpClient.Disconnect(true);
                }
                catch
                {
                    return false;
                }

            }
            return true;
        }
    }
}
