using System.ComponentModel.DataAnnotations;

namespace Data.Enums
{
    public enum ErrorState
    {
        New,
        Open,
        Fixed,
        Retest,
        Closed,
        Rejected,
        Reopened,
    }
}
