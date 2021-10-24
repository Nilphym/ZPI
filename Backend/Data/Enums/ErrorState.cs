using System.ComponentModel.DataAnnotations;

namespace Data.Enums
{
    public enum ErrorState
    {
        [Display(Name = "New")]
        New,

        [Display(Name = "In progress")]
        In_progress,
        Repaired,
        Retest,
        Approved,

        [Display(Name = "Not approved")]
        Not_approved,
        Rejected,

    }
}
