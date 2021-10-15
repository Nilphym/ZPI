using AutoMapper;
using Data.Models;
using Funtest.TransferObject.Steps;
using Funtest.TransferObject.TestCase.Requests;
using Funtest.TransferObject.TestCase.Responses;

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

            //Mapowania dla Test casów
            CreateMap<AddTestCaseRequest, TestCase>();
            CreateMap<TestCase, GetTestCaseResponse>();

        }
    }
}
