using AppTemplate.Models;
using Microsoft.EntityFrameworkCore;


namespace AppTemplate.Persistence
{
    public class AppTemplateDbContext :DbContext
    {
        public AppTemplateDbContext(DbContextOptions<AppTemplateDbContext> options)
        :base(options)
        {
        }

        public DbSet<User> Users {get; set;}
        public DbSet<Role> Roles {get; set;}

    }   

}