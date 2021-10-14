using AutoMapper;
using Data.Models;
using Funtest.TransferObject;
using Funtest.TransferObject.Steps;

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


        }
    }
}
