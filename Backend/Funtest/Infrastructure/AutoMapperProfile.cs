using AutoMapper;
using Data.Models;
using Funtest.TransferObject.Error.Responses;
using Funtest.TransferObject.Steps;
using Funtest.TransferObject.Steps.Requests;
using Funtest.TransferObject.Steps.Responses;
using Funtest.TransferObject.Test.Requests;
using Funtest.TransferObject.Test.Response;
using Funtest.TransferObject.TestCase.Requests;
using Funtest.TransferObject.TestCase.Responses;
using Funtest.TransferObject.TestProcedure.Requests;
using Funtest.TransferObject.TestProcedure.Responses;

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

            //Mapowania dla TestCase
            CreateMap<AddTestCaseRequest, TestCase>();
            CreateMap<TestCase, GetTestCaseResponse>();

            //Mapowania dla TestProcedure
            CreateMap<AddTestProcedureRequest, TestProcedure>();
            CreateMap<TestProcedure, GetTestProcedureResponse>();
            CreateMap<TestProcedure, GetTestProcedureIdentityValueResponse>();

            //Mapowania dla TestProcedure
            CreateMap<AddTestRequest, Test>();
            CreateMap<Test, GetTestResponse>();

            //Mapowanie dla Błędów
            CreateMap<Error, GetErrorResponse>();
        }
    }
}
