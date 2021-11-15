using Data;
using Data.Enums;
using Data.Models;
using System;

namespace Funtest.Test
{
    public class DummyDataDbInitializer
    {
        public DummyDataDbInitializer()
        {
        }

        public void Seed(DatabaseContext context)
        {
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            context.AddRange(
                new User()
                {
                    Id = "4a15e2f7-52dd-4e22-b0f4-241944216775",
                    FirstName = "Norbert",
                    LastName = "Stefan",
                    Email = "stefan@workspace.com",
                    UserName = "stefan@workspace.com",
                    PasswordHash = "AQAAAAEAACcQAAAAEOI+4tuKt2/0PDENpCrzHbr9fzaK/pTKH3qz315itfA0htAYGMjf6Zwe7n0TlkePog==",
                    ProductId = Guid.Parse("1D50362B-B86F-4081-85E4-0FF410A0A0D3")
                },
                   new User()
                   {
                       Id = "5ffe2032-6c7c-48c6-950f-e47976b2389a",
                       FirstName = "Jan",
                       LastName = "Kwiatkowski",
                       Email = "stefan@workspace.com",
                       UserName = "kwiatkowski@workspace.com",
                       PasswordHash = "AQAAAAEAACcQAAAAEOI+4tuKt2/0PDENpCrzHbr9fzaK/pTKH3qz315itfA0htAYGMjf6Zwe7n0TlkePog==",
                       ProductId = Guid.Parse("1D50362B-B86F-4081-85E4-0FF410A0A0D3")
                   }
            );

            context.Products.Add(
                new Product()
                {
                    Id = Guid.Parse("1D50362B-B86F-4081-85E4-0FF410A0A0D3"),
                    Version = 1,
                    Name = "New board game",
                    CreationDate = DateTime.Now
                }
            );

            context.TestPlans.AddRange(
                new TestPlan()
                {
                    Id = Guid.Parse("4909D8B9-62E1-4F7E-0F82-08D99A06BA5D"),
                    Name = "Test of the third game module",
                    ProductId = Guid.Parse("1D50362B-B86F-4081-85E4-0FF410A0A0D3")
                },
                 new TestPlan()
                 {
                     Id = Guid.Parse("63C0F12A-FB8E-496C-8C2B-8D86D79A9CD4"),
                     Name = "Logic of a board game",
                     ProductId = Guid.Parse("1D50362B-B86F-4081-85E4-0FF410A0A0D3")
                 }
                 );

            context.TestSuites.AddRange(
                new TestSuite()
                {
                    Id = Guid.Parse("455B4083-6828-471A-13ED-08D99A212F79"),
                    Category = "Communication with users",
                    TestPlanId = Guid.Parse("4909D8B9-62E1-4F7E-0F82-08D99A06BA5D")
                },
                new TestSuite()
                {
                    Id = Guid.Parse("C86BB2BF-BC8A-4F78-4D06-08D9A36B76DA"),
                    Category = "Login",
                    TestPlanId = Guid.Parse("4909D8B9-62E1-4F7E-0F82-08D99A06BA5D")
                });

            context.Tests.AddRange(
                new Data.Models.Test()
                {
                    Id = Guid.Parse("8C890C1A-5803-4F7B-0E6D-08D99A2156C6"),
                    CreationDate = DateTime.Now,
                    Name = "Successful survey test",
                    ExecutionCounter = 4,
                    TestSuiteId = Guid.Parse("455B4083-6828-471A-13ED-08D99A212F79"),
                    TestProcedureId = Guid.Parse("EA45ABE1-EC02-499D-B274-08D99A273EC8"),
                    TestCaseId = Guid.Parse("A616482D-6B80-47BC-718C-08D99A2720F8")
                },
                new Data.Models.Test()
                {
                    Id = Guid.Parse("46B6E71E-0E03-46CF-B8AD-08D9A2B6B904"),
                    CreationDate = DateTime.Now,
                    Name = "Negative survey testt",
                    ExecutionCounter = 2,
                    TestSuiteId = Guid.Parse("455B4083-6828-471A-13ED-08D99A212F79"),
                    TestProcedureId = Guid.Parse("EA45ABE1-EC02-499D-B274-08D99A273EC8"),
                    TestCaseId = Guid.Parse("A616482D-6B80-47BC-718C-08D99A2720F8")
                }
                );

            context.TestProcedures.AddRange(
                new TestProcedure()
                {
                    Id = Guid.Parse("EA45ABE1-EC02-499D-B274-08D99A273EC8"),
                    Result = "Successfully completed form",
                    Code = "TP-EA45ABE1",
                    TestCaseId = Guid.Parse("A616482D-6B80-47BC-718C-08D99A2720F8")
                },
                new TestProcedure()
                {
                    Id = Guid.Parse("11C46618-B9B0-48C0-4A37-08D9A35B0C7F"),
                    Result = "Failed completed form",
                    Code = "TP-11C46618",
                    TestCaseId = Guid.Parse("A616482D-6B80-47BC-718C-08D99A2720F8")
                });

            context.TestCases.AddRange(
                new TestCase()
                {
                    Id = Guid.Parse("A616482D-6B80-47BC-718C-08D99A2720F8"),
                    Code = "TC-A616482D",
                    Preconditions = "User is logged",
                    ProductId = Guid.Parse("1D50362B-B86F-4081-85E4-0FF410A0A0D3")
                });

            context.Steps.AddRange(
                new Step()
                {
                    Id = Guid.Parse("B36F4804-5713-4E63-04D2-08D98EF5F25B"),
                    Name = "Step #1",
                    StepNumber = 1,
                    ControlPoint = "Now you should see survey",
                    TestProcedureId = Guid.Parse("EA45ABE1-EC02-499D-B274-08D99A273EC8")
                },
                  new Step()
                  {
                      Id = Guid.Parse("2C0D2916-8D2C-4FA4-B9FB-57D96E9CB897"),
                      Name = "Step #2",
                      StepNumber = 1,
                      ControlPoint = "Text box highlighted in red",
                      TestProcedureId = Guid.Parse("EA45ABE1-EC02-499D-B274-08D99A273EC8")
                  }
                );

            context.Errors.AddRange(
                 new Error()
                 {
                     Id = Guid.Parse("22BD1F84-B9E5-4183-9502-036EAFE67622"),
                     Name = "Bug #1",
                     ReportDate = DateTime.Today,
                     Description = "Error description",
                     Deadline = Convert.ToDateTime("20.12.2021"),
                     RetestsRequired = 2,
                     EndDate = Convert.ToDateTime("12.12.2021"),
                     Functionality = "Authorization",
                     Code = "B-2434343",
                     ErrorState = ErrorState.New,
                     ErrorImpact = ErrorImpact.High,
                     ErrorPriority = ErrorPriority.Low,
                     ErrorType = ErrorType.Functional,
                     StepId = Guid.Parse("B36F4804-5713-4E63-04D2-08D98EF5F25B"),
                     TesterId = "5ffe2032-6c7c-48c6-950f-e47976b2389a",
                     TestId = Guid.Parse("8C890C1A-5803-4F7B-0E6D-08D99A2156C6")
                 },
                   new Error()
                   {
                       Id = Guid.Parse("E1C3E517-A777-47D7-8290-4EEB4D13711E"),
                       Name = "Bug #2",
                       ReportDate = Convert.ToDateTime("2.06.2020"),
                       Description = "Error description",
                       Deadline = Convert.ToDateTime("20.12.2021"),
                       RetestsRequired = 2,
                       EndDate = Convert.ToDateTime("12.12.2021"),
                       Code = "B-2434343",
                       Functionality = "Functional",
                       ErrorState = ErrorState.Open,
                       ErrorImpact = ErrorImpact.High,
                       ErrorPriority = ErrorPriority.Low,
                       ErrorType = ErrorType.Functional,
                       StepId = Guid.Parse("B36F4804-5713-4E63-04D2-08D98EF5F25B"),
                       DeveloperId = "4a15e2f7-52dd-4e22-b0f4-241944216775",
                       TesterId = "5ffe2032-6c7c-48c6-950f-e47976b2389a",
                       TestId = Guid.Parse("8C890C1A-5803-4F7B-0E6D-08D99A2156C6")
                   }
            );

            context.SaveChanges();
        }
    }
}
