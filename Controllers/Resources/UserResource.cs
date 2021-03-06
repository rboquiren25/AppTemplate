using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace AppTemplate.Controllers.Resources
{
    public class UserResource
    {
        
        public int Id { get; set; }        
        public string Username { get; set; }      
        public string Password { get; set; }       
        public string Email { get; set; }   
        public ICollection<RoleResource> Roles {get; set;}
        public UserResource()
        {
            Roles = new Collection<RoleResource>();
        }
    }
}