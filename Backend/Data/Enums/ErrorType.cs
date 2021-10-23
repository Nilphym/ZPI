using System.ComponentModel.DataAnnotations;

namespace Data.Enums
{
    public enum ErrorType
    {
        Functional,
        Logical,

        [Display(Name = "Wrong Datatype")]
        Wrong_Datatype
    }
}
