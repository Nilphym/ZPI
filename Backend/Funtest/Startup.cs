using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Data;
using Microsoft.EntityFrameworkCore;
using Data.Models;
using System;
using Funtest.Interfaces;
using Funtest.Services;
using Funtest.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace Funtest
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DatabaseContext>(options =>
                options.UseSqlServer(
                    Configuration.GetConnectionString("DefaultConnection")));

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.AddTransient<IAuthService, AuthService>();
            services.AddTransient<IJWTService, JWTService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IStepService, StepService>();
            services.AddTransient<ITestProcedureService, TestProcedureService>();
            services.AddTransient<ITestCaseService, TestCaseService>();
            services.AddTransient<ITestService, TestService>();
            services.AddTransient<IErrorService, ErrorService>();
            services.AddTransient<IAdminService, AdminService>();
            services.AddTransient<IProductService, ProductService>();
            services.AddTransient<ITestSuiteService, TestSuiteService>();
            services.AddTransient<IAttachmentService, AttachmentService>();
            services.AddTransient<ITestPlanService, TestPlanService>();

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                builder => builder
                   .AllowAnyMethod()
                   .AllowAnyHeader()
                   .SetIsOriginAllowed(origin => true) // allow any origin
                   .AllowCredentials());
            });

            services.AddIdentity<User, IdentityRole>(opt =>
            {
                opt.Lockout.AllowedForNewUsers = false;
            })
                .AddSignInManager<SignInManager<User>>()
                .AddEntityFrameworkStores<DatabaseContext>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = Configuration["Jwt:Issuer"],
                    ValidAudience = Configuration["Jwt:Issuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
                };
            });

            services.AddAuthorization(options =>
          {
              var defaultAuthorizationPolicyBuilder = new AuthorizationPolicyBuilder(
                  JwtBearerDefaults.AuthenticationScheme);

              defaultAuthorizationPolicyBuilder =
                  defaultAuthorizationPolicyBuilder.RequireAuthenticatedUser();

              options.DefaultPolicy = defaultAuthorizationPolicyBuilder.Build();
          });

            services.AddMvc().AddNewtonsoftJson();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Funtest", Version = "v1" });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = "JWT Authorization.",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("CorsPolicy");

            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Funtest v1"));

            app.UseHttpsRedirection();
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
