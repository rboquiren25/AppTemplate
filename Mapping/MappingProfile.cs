using AppTemplate.Controllers.Resources;
using AppTemplate.Models;
using AutoMapper;

namespace AppTemplate.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserResource>();
            CreateMap<Role, RoleResource>();
        }
    }
}