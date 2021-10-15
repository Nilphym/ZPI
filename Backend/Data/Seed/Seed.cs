using Data.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Data.Seed
{
    public static class Seed
    {
        public static async Task Initialization(DatabaseContext context, UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            await SeedRoles(roleManager);
            await SeedUsers(context, userManager);
        }

        private static async Task SeedRoles(RoleManager<IdentityRole> roleManager)
        {
            if (!await roleManager.RoleExistsAsync(Roles.Roles.Administrator))
            {
                var adminRole = new IdentityRole(Roles.Roles.Administrator);
                await roleManager.CreateAsync(adminRole);
            }

            if (!await roleManager.RoleExistsAsync(Roles.Roles.Tester))
            {
                var testerRole = new IdentityRole(Roles.Roles.Tester);
                await roleManager.CreateAsync(testerRole);
            }

            if (!await roleManager.RoleExistsAsync(Roles.Roles.Developer))
            {
                var developertRole = new IdentityRole(Roles.Roles.Developer);
                await roleManager.CreateAsync(developertRole);
            }
        }

        private static async Task SeedUsers(DatabaseContext context, UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                const string adminEmail = "admin@workspace.com";
                const string adminLastName = "Admin";
                const string adminFirstName = "Admin";
                const string adminPassword = "Admin123!";

                var adminAccount = await userManager.FindByEmailAsync(adminEmail);
                if (adminAccount == null)
                {
                    var admin = new User
                    {
                        Id = Guid.NewGuid().ToString(),
                        FirstName = adminFirstName,
                        LastName = adminLastName,
                        UserName = adminEmail,
                        Email = adminEmail,
                    };
                    var result = await userManager.CreateAsync(admin, adminPassword);
                    if (result.Succeeded)
                    {
                        await userManager.AddToRoleAsync(admin, Roles.Roles.Administrator);
                    }
                }

                var testers = new List<User>
                {
                    new Tester
                    {
                        Id = Guid.Parse("5ffe2032-6c7c-48c6-950f-e47976b2389a").ToString(),
                        FirstName = "Jan",
                        LastName = "Kwiatkowski",
                        UserName = "kwiatkowski@workspace.com",
                        Email = "kwaitkowski@workspace.com",
                    },
                    new Tester
                    {
                        Id = Guid.Parse("9b348741-db54-4471-aa48-7284b11cab4b").ToString(),
                        FirstName = "Adam",
                        LastName = "Kania",
                        Email = "kania@workspace.com",
                    },
                };

                var developers = new List<User>
                {
                    new Developer
                    {
                        Id = Guid.Parse("651799e0-fccf-4e6d-a5d2-1c153ae77f72").ToString(),
                        FirstName = "Anna",
                        LastName = "Miła",
                        UserName = "mila@workspace.com",
                        Email = "mila@workspace.com",
                    },
                    new Developer
                    {
                        Id = Guid.Parse("4a15e2f7-52dd-4e22-b0f4-241944216775").ToString(),
                        FirstName = "Norbert",
                        LastName = "Stefan",
                    UserName = "stefan@workspace.com",
                        Email = "stefan@workspace.com",
                    }
                };


                foreach (var user in testers)
                {
                    var result = await userManager.CreateAsync(user, "Password123!");
                    if (result.Succeeded)
                    {
                        await userManager.AddToRoleAsync(user, Roles.Roles.Tester);
                    }
                }

                foreach (var user in developers)
                {
                    var result = await userManager.CreateAsync(user, "Password123!");
                    if (result.Succeeded)
                    {
                        await userManager.AddToRoleAsync(user, Roles.Roles.Developer);
                    }
                }
            }
        }
    }
}
