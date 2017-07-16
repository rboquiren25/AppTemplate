using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AppTemplate.Controllers.Resources;
using AppTemplate.Models;
using AppTemplate.Persistence;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Claims;
using Microsoft.AspNetCore.Http.Authentication;
using System.Linq;
using Microsoft.AspNetCore.Authorization;

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

        [Authorize(ActiveAuthenticationSchemes="Bearer")]
        [HttpPost("/api")]
        public async Task<IEnumerable<UserResource>> GetUsers()
        {
            var users = await context.Users.Include(u => u.Roles).ToListAsync();
            return mapper.Map<List<User>, List<UserResource>>(users);
        }

        
        public async Task<bool> Login(string username, string password)
        {
            byte[] salt = new byte[128 / 8];
            

            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
           password: password,
           salt: System.Text.Encoding.ASCII.GetBytes(username),
            prf: KeyDerivationPrf.HMACSHA1,
           iterationCount: 10000,
           numBytesRequested: 256 / 8));

            User User = new User();
            User = context.Users.Where(u => u.Username.Equals(username) && u.Password.Equals(hashed)).FirstOrDefault();

            if (User != null)
            {
                const string Issuer = "MySystemCore";
                var claims = new List<Claim>();
                claims.Add(new Claim(ClaimTypes.Name, User.Username, ClaimValueTypes.String, Issuer));

                foreach(Role r in User.Roles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, r.RoleName, ClaimValueTypes.String, Issuer));
                }
                

                var userIdentity = new ClaimsIdentity("SuperSecureLogin");
                userIdentity.AddClaims(claims);
                var userPrincipal = new ClaimsPrincipal(userIdentity);

                await HttpContext.Authentication.SignInAsync("SystemCore", userPrincipal,
                    new AuthenticationProperties
                    {
                        ExpiresUtc = DateTime.UtcNow.AddMinutes(240),
                        IsPersistent = false,
                        AllowRefresh = false
                    });

               return true; 
            }
             return false;
        }

    }
}