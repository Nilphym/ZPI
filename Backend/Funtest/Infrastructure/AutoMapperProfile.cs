using AutoMapper;
using Data.Models;
using Funtest.TransferObject.Admin.Requests;
using Funtest.TransferObject.Attachment.Requests;
using Funtest.TransferObject.Attachment.Responses;
using Funtest.TransferObject.Error.Requests;
using Funtest.TransferObject.Error.Responses;
using Funtest.TransferObject.Product.Responses;
using Funtest.TransferObject.Review.Requests;
using Funtest.TransferObject.Steps;
using Funtest.TransferObject.Steps.Requests;
using Funtest.TransferObject.Steps.Responses;
using Funtest.TransferObject.Test.Requests;
using Funtest.TransferObject.Test.Response;
using Funtest.TransferObject.TestCase.Requests;
using Funtest.TransferObject.TestCase.Responses;
using Funtest.TransferObject.TestPlan.Requests;
using Funtest.TransferObject.TestPlan.Responses;
using Funtest.TransferObject.TestProcedure.Requests;
using Funtest.TransferObject.TestProcedure.Responses;
using Funtest.TransferObject.TestSuite.Requests;
using Funtest.TransferObject.TestSuite.Responses;

namespace Funtest.Infrastructure
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            //Mapowanie dla controlera Step 
            CreateMap<AddStepRequest, Step>();
            CreateMap<GetStepResponse, Step>();
            CreateMap<Step, GetStepResponse>();
            CreateMap<Step, GetStepWithErrorResponse>();

            //Mapowania dla TestCase
            CreateMap<AddTestCaseRequest, TestCase>();
            CreateMap<TestCase, GetTestCaseResponse>();
            CreateMap<TestCase, GetTestCaseIdentityValueResponse>();

            //Mapowania dla TestProcedure
            CreateMap<AddTestProcedureRequest, TestProcedure>();
            CreateMap<TestProcedure, GetTestProcedureResponse>();
            CreateMap<TestProcedure, GetTestProcedureIdentityValueResponse>();

            //Mapowania dla TestProcedure
            CreateMap<AddTestRequest, Test>();
            CreateMap<Test, GetTestResponse>();

            //Mapowania dla TestSuite
            CreateMap<TestSuite, GetTestSuiteResponse>();
            CreateMap<TestSuite, GetTestSuiteWithTestsResponse>();
            CreateMap<AddTestSuiteRequest, TestSuite>();

            //Mapowania dla Test Planów
            CreateMap<AddTestPlanRequest, TestPlan>();
            CreateMap<TestPlan, GetTestPlanWithTestSuitesAndTestsResponse>();
            CreateMap<TestPlan, GetTestPlanIdentityValueResponse>();

            //Mapowanie dla Błędów
            CreateMap<Error, GetErrorResponse>();
            CreateMap<AddErrorRequest, Error>();
            CreateMap<Error, GetIdentityErrorInformationRespons>();

            //Mapowani dla testu
            CreateMap<Test, GetTestResponse>();
            CreateMap<Test, GetTestIdentityInformationResponse>();
            CreateMap<Test, GetTestBasicInformationResponse>();

            //Mapowanie dla Załącznika
            CreateMap<AddAttachmentRequest, Attachment>();
            CreateMap<Attachment, GetAttachmentResponse>();

            //Mapowania dla Usera
            CreateMap<AddNewUserRequest, User>();

            //Mapowania dla Produkty
            CreateMap<Product, GetProductResponse>();

            //Mapowania dla Review
            CreateMap<AddReviewRequest, Review>();
        }
    }
}
