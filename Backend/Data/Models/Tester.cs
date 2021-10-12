using System.Collections.Generic;

namespace Data.Models
{
    public class Tester: User
    {
        public virtual ICollection<Error> Errors { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
    }
}
