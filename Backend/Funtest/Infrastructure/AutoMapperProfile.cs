using AutoMapper;
using Data.Models;
using Funtest.TransferObject.Steps;
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
            CreateMap<StepsAddStep, Step>();
            CreateMap<StepsGetStep, Step>();
            CreateMap<Step, StepsGetStep>();

            //Mapowania dla TestCase
            CreateMap<AddTestCaseRequest, TestCase>();
            CreateMap<TestCase, GetTestCaseResponse>();

            //Mapowania dla TestProcedure
            CreateMap<AddTestProcedureRequest, TestProcedure>();
            CreateMap<TestProcedure, GetTestProcedureResponse>();

            //Mapowania dla TestProcedure
            CreateMap<AddTestRequest, Test>();
            CreateMap<Test, GetTestResponse>();
        }
    }
}
