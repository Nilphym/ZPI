using Microsoft.AspNetCore.Identity;

namespace Data.Models
{
    public class User : IdentityUser<string>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
