namespace ExtranetAPI.Analytics.Services;

public interface IAnalyticsService
{
    decimal CalculateProjectMargin(decimal costs, decimal projectCost);
    decimal CalculateProjectProfitNorm(decimal costs, decimal projectCost);
    decimal CalculateProjectRateOfSurplusValue(decimal costs, decimal projectCost);
}