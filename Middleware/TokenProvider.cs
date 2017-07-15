using System;
using System.Threading.Tasks;
using AppTemplate.Persistence;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace AppTemplate.Middleware
{
    public class TokenProvider
    {
        private readonly RequestDelegate _next;
        private readonly TokenProviderOptions _options;
        //private readonly UserManager<ApplicationUser> _userManager;
        private readonly AppTemplateDbContext db;

        public TokenProvider(
        RequestDelegate next,
        IOptions<TokenProviderOptions> options,
        AppTemplateDbContext db)        
        {
            this._next = next;
            this.db = db;
            this._options = options.Value;
        }

        public Task Invoke(HttpContext context)
        {
            if(!context.Request.Path.Equals(_options.Path,StringComparison.Ordinal))
            {
                return _next(context);
            }

            if(!context.Request.Method.Equals("POST") || !context.Request.HasFormContentType){
                context.Response.StatusCode = 400;
                return context.Response.WriteAsync("Bad Request");
            }

        }

        private async Task GenerateToken(HttpContext context)
        {
            var username = context.Request.Form["username"];
            var password = context.Request.Form["password"];
        }

    }

    public class TokenProviderOptions
    {
        public string Path { get; set; } = "/token";
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public TimeSpan Expiration { get; set; } = TimeSpan.FromMinutes(5);
        public SigningCredentials SigningCredentials { get; set; }
    }
}