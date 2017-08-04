using AppTemplate.Controllers.Resources;
using AppTemplate.Models;
using AutoMapper;

namespace AppTemplate.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //domain to resoure
            CreateMap<User, UserResource>();
            CreateMap<Role, RoleResource>();

            //resource to domain
            CreateMap<UserResource, User>(); 
            CreateMap<RoleResource, Role>();
        }
    }
}