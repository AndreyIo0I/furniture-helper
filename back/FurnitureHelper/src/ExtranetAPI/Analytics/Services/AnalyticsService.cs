using Domain.ProjectManagement;
using ExtranetAPI.Models;

namespace ExtranetAPI.Analytics.Services;

public class AnalyticsService : IAnalyticsService
{
    public decimal CalculateProjectMargin( decimal costs, decimal projectCost )
    {
        return projectCost - costs;
    }

    public decimal CalculateProjectProfitNorm( decimal costs, decimal projectCost )
    {
        if ( costs == decimal.Zero )
        {
            return decimal.Zero;
        }
        
        return decimal.Divide( CalculateProjectMargin( costs, projectCost ), costs );
    }
    
    public decimal CalculateProjectRateOfSurplusValue( decimal costs, decimal projectCost )
    {
        if ( projectCost == decimal.Zero )
        {
            return decimal.Zero;
        }
        
        return decimal.Divide( CalculateProjectMargin( costs, projectCost ), projectCost );
    }

    public decimal CalculateAverageCheck( List<decimal> projectsCosts )
    {
        return decimal.Divide( projectsCosts.Sum(), projectsCosts.Count );
    }

    public int CalculateAverageProductionDays( List<Period> projectsPeriods )
    {
        return ( int )( projectsPeriods.Select(x => ( x.EndDate.Date - x.StartDate.Date ).TotalDays ).Sum() /
                     projectsPeriods.Count );
    }
}