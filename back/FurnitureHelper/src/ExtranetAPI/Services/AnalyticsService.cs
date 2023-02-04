namespace ExtranetAPI.Services;

public class AnalyticsService : IAnalyticsService
{
    public decimal CalculateProjectMargin( decimal costs, decimal projectCost )
    {
        return projectCost - costs;
    }

    public decimal CalculateProjectProfitNorm( decimal costs, decimal projectCost )
    {
        return decimal.Divide( CalculateProjectMargin( costs, projectCost ), costs );
    }
    
    public decimal CalculateProjectRateOfSurplusValue( decimal costs, decimal projectCost )
    {
        return decimal.Divide( CalculateProjectMargin( costs, projectCost ), projectCost );
    }
}