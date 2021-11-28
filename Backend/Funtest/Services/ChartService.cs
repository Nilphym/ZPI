using Data.Models;
using Data.Roles;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.Chart.Responses;
using Funtest.TransferObject.TestSuite.Responses;
using System;
using System.Linq;

namespace Funtest.Services
{
    public class ChartService : Service, IChartService
    {
        public ChartService(IServiceProvider serviceProvider) : base(serviceProvider)
        {

        }
        private int CountNumberOfPersonInRole(string role)
        {
            var roleId = Context.Roles.Where(x => x.Name == role).FirstOrDefault().Id;

            return Context.UserRoles
                .Join(Context.Users, role => role.UserId, user => user.Id, (roleId, userId) => new { roleId = roleId.RoleId, userId = userId.Id })
                .Where(x => x.roleId == roleId).Count();
        }

        public ChartResponse GetDataToChart(Product product)
        {
            var testerNumber = CountNumberOfPersonInRole(Roles.Tester);
            var developerNumber = CountNumberOfPersonInRole(Roles.Developer);

            ChartResponse chartResponse = new ChartResponse()
            {
                DaysFromStart = (int)(DateTime.Now - product.CreationDate).TotalDays,
                TestersNumber = testerNumber,
                DevsNumber = developerNumber,
                TestPlansNumber = Context.TestPlans.Where(x => x.ProductId == product.Id).Count(),
                TestSuitesNumber = Context.TestSuites.Where(x => x.TestPlan.ProductId == product.Id).Count(),
                TestsNumber = Context.Tests.Where(x => x.TestSuite.TestPlan.ProductId == product.Id).Count(),
            };

            var testSuites = Context.TestSuites.Where(x => x.TestPlan.ProductId == product.Id).ToList();
            chartResponse.TestSuitesByName = new System.Collections.Generic.List<GetNumberOfTestInTestSuitResponse>();
            
            foreach(var testSuite in testSuites)
            {
                chartResponse.TestSuitesByName.Add(
                    new GetNumberOfTestInTestSuitResponse()
                    {
                        Name = testSuite.Category,
                        NumberOfTest = Context.Tests.Where(x => x.TestSuiteId == testSuite.Id).Count()
                    });
            }

            return chartResponse;
        }
    }
}
