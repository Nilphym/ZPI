/*using Data;
using Funtest.Controllers;
using Funtest.Interfaces;
using Funtest.Services;
using Funtest.Services.Interfaces;
using Funtest.TransferObject.Error.Responses;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using Xunit;

namespace Funtest.Test
{
    public class ErrorControllerTest
    {
        private static readonly IErrorService _errorService;
        private static readonly IUserService _userService;
        private static readonly ITestService _testService;
        private static readonly IStepService _stepService;
        private static readonly IReviewService _reviewService;

        public static DbContextOptions<DatabaseContext> dbContextOptions { get; }

        static ErrorControllerTest(IErrorService errorService, IUserService userService, ITestService testService, IStepService stepService, IReviewService reviewService)
        {
            dbContextOptions = new DbContextOptionsBuilder<DatabaseContext>()
                .UseSqlServer("Server=.;Database=funtest_teest;Trusted_Connection=True")
                .Options;

            _errorService = errorService;
            _userService = userService;
            _testService = testService;
            _stepService = stepService;
            _reviewService = reviewService;
        }

        public ErrorControllerTest()
        {
            var context = new DatabaseContext(dbContextOptions);
            DummyDataDbInitializer db = new DummyDataDbInitializer();
            db.Seed(context);
        }

        [Fact]
        public async void Task_GetPostById_Return_OkResult()
        {
            //Arrange  
            var controller = new ErrorsController(_errorService, _userService, _testService, _stepService, _reviewService);

            //Act  
            var data = await controller.GetError(Guid.Parse("22BD1F84-B9E5-4183-9502-036EAFE67622"));

            //Assert  
            Assert.IsType<GetErrorResponse>(data);
        }
    }
}
*/