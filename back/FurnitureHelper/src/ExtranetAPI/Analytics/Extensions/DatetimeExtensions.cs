using ExtranetAPI.Models;

namespace ExtranetAPI.Analytics.Extensions;

public static class DatetimeExtensions
{
    public static Period Week( this DateTime dt )
    {
        int diff = dt.DayOfWeek - DayOfWeek.Monday;
        if (diff < 0)
        {
            diff += 7;
        }

        DateTime startDate = dt.AddDays(-1 * diff).Date;
        
        return new( startDate, startDate.AddDays( 6 ) );
    }
}