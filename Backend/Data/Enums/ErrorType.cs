using System.ComponentModel.DataAnnotations;

namespace Data.Enums
{
    public enum ErrorType
    {
        Functional,
        Logic,
        Performance,
        Usability,
        Compatibility,
        Security,
        Syntax,
        [Display(Name = "System-level integration")]
        System_Level_Integration,

        [Display(Name = "Unit-level bugs")]
        Unit_Level_Bugs,

        [Display(Name = "Wrong data type")]
        Wrong_Datatype
    }
}
