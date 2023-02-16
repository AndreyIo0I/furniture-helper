using ExtranetAPI.Models;

namespace ExtranetAPI.Analytics.Services;

public interface IAnalyticsService
{
    decimal CalculateProjectMargin(decimal costs, decimal projectCost);
    decimal CalculateProjectProfitNorm(decimal costs, decimal projectCost);
    decimal CalculateProjectRateOfSurplusValue(decimal costs, decimal projectCost);
    decimal CalculateAverageCheck(List<decimal> projectsCosts);
    int CalculateAverageProductionDays(List<Period> projectsPeriods);
}