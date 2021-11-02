using Data.Enums;
using Data.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace Data.Seed
{
    public static class ObjectSeed
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Error>()
                .HasData(
                   new Error()
                   {
                       Id = Guid.NewGuid(),
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
                       DeveloperId = "651799e0-fccf-4e6d-a5d2-1c153ae77f72",
                       TesterId = "5ffe2032-6c7c-48c6-950f-e47976b2389a"
                   },
                     new Error()
                     {
                         Id = Guid.NewGuid(),
                         Name = "Bug #2",
                         ReportDate = Convert.ToDateTime("2.06.2020"),
                         Description = "Error description",
                         Deadline = Convert.ToDateTime("20.12.2021"),
                         RetestsRequired = 2,
                         EndDate = Convert.ToDateTime("12.12.2021"),
                         Code = "B-2434343",
                         Functionality = "Functional",
                         ErrorState = ErrorState.Fixed,
                         ErrorImpact = ErrorImpact.High,
                         ErrorPriority = ErrorPriority.Low,
                         ErrorType = ErrorType.Functional,
                         StepId = Guid.Parse("B36F4804-5713-4E63-04D2-08D98EF5F25B"),
                         DeveloperId = "4a15e2f7-52dd-4e22-b0f4-241944216775",
                         TesterId = "5ffe2032-6c7c-48c6-950f-e47976b2389a"
                     },
                       new Error()
                       {
                           Id = Guid.NewGuid(),
                           Name = "Bug #3",
                           ReportDate = DateTime.Today,
                           Description = "Error description",
                           Deadline = Convert.ToDateTime("20.12.2021"),
                           RetestsRequired = 2,
                           EndDate = Convert.ToDateTime("12.12.2021"),
                           Functionality = "UX",
                           ErrorState = ErrorState.Retest,
                           Code = "B-2434343",
                           ErrorImpact = ErrorImpact.High,
                           ErrorPriority = ErrorPriority.Low,
                           ErrorType = ErrorType.Logical,
                           StepId = Guid.Parse("B36F4804-5713-4E63-04D2-08D98EF5F25B"),
                           DeveloperId = "651799e0-fccf-4e6d-a5d2-1c153ae77f72",
                           TesterId = "5ffe2032-6c7c-48c6-950f-e47976b2389a"
                       },
                         new Error()
                         {
                             Id = Guid.NewGuid(),
                             Name = "Bug #4",
                             ReportDate = DateTime.Today,
                             Description = "Error description",
                             Deadline = Convert.ToDateTime("20.12.2021"),
                             RetestsRequired = 2,
                             EndDate = Convert.ToDateTime("12.12.2021"),
                             Functionality = "Database",
                             Code = "B-2434343",
                             ErrorState = ErrorState.Retest,
                             ErrorImpact = ErrorImpact.Medium,
                             ErrorPriority = ErrorPriority.High,
                             ErrorType = ErrorType.Wrong_Datatype,
                             StepId = Guid.Parse("B36F4804-5713-4E63-04D2-08D98EF5F25B"),
                             DeveloperId = "4a15e2f7-52dd-4e22-b0f4-241944216775",
                             TesterId = "5ffe2032-6c7c-48c6-950f-e47976b2389a"
                         },
                          new Error()
                          {
                              Id = Guid.NewGuid(),
                              Name = "Bug #5",
                              ReportDate = DateTime.Today,
                              Description = "Error description",
                              Deadline = Convert.ToDateTime("20.12.2021"),
                              RetestsRequired = 2,
                              EndDate = Convert.ToDateTime("12.12.2021"),
                              Functionality = "Database",
                              Code = "B-2434343",
                              ErrorState = ErrorState.Retest,
                              ErrorImpact = ErrorImpact.Medium,
                              ErrorPriority = ErrorPriority.High,
                              ErrorType = ErrorType.Wrong_Datatype,
                              StepId = Guid.Parse("B36F4804-5713-4E63-04D2-08D98EF5F25B"),
                              DeveloperId = "4a15e2f7-52dd-4e22-b0f4-241944216775",
                              TesterId = "5ffe2032-6c7c-48c6-950f-e47976b2389a"
                          },
                           new Error()
                           {
                               Id = Guid.NewGuid(),
                               Name = "Bug #6",
                               ReportDate = DateTime.Today,
                               Description = "Error description",
                               Deadline = Convert.ToDateTime("20.12.2021"),
                               RetestsRequired = 2,
                               Code = "B-2434343",
                               EndDate = Convert.ToDateTime("12.12.2021"),
                               Functionality = "Database",
                               ErrorState = ErrorState.Retest,
                               ErrorImpact = ErrorImpact.Medium,
                               ErrorPriority = ErrorPriority.High,
                               ErrorType = ErrorType.Wrong_Datatype,
                               StepId = Guid.Parse("B36F4804-5713-4E63-04D2-08D98EF5F25B"),
                               DeveloperId = "4a15e2f7-52dd-4e22-b0f4-241944216775",
                               TesterId = "5ffe2032-6c7c-48c6-950f-e47976b2389a"
                           }
            );

            modelBuilder.Entity<Step>()
               .HasData(
                  new Step()
                  {
                      Id = Guid.Parse("B36F4804-5713-4E63-04D2-08D98EF5F25B"),
                      Name = "Step #1",
                      StepNumber = 1,
                      ControlPoint = "Now you sholud see main page"
                  }
                  );
        }
    }
}