using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Models
{
    public class User : IdentityUser<string>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsDeleted { get; set; }

        [ForeignKey("ProductId")]
        public Guid? ProductId { get; set; }
        public virtual Product Product { get; set; }
    }
}
