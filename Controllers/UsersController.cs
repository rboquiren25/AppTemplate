using System.Collections.Generic;
using System.Threading.Tasks;
using AppTemplate.Controllers.Resources;
using AppTemplate.Models;
using AppTemplate.Persistence;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AppTemplate.Controllers
{
    public class UsersController : Controller
    {
        private readonly AppTemplateDbContext context;
        private readonly IMapper mapper;
        public UsersController(AppTemplateDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;

        }

        [HttpGet("/api/Users")]
        public async Task<IEnumerable<UserResource>> GetUsers()
        {
            var users = await context.Users.Include(u => u.Roles).ToListAsync();
            return mapper.Map<List<User>, List<UserResource>>(users);
        }

    }
}