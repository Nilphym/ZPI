using System.ComponentModel.DataAnnotations;

namespace Data.Enums
{
    public enum ErrorState
    {
        New = 0,
        Open = 1,
        Fixed = 2,
        Retest = 3,
        Closed = 4,
        Rejected = 5,
        Reopened = 6,
    }
}
