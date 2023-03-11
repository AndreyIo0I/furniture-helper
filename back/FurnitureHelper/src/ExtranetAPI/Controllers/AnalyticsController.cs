using ExtranetAPI.Analytics.Models;
using ExtranetAPI.Analytics.Models.Chart;
using ExtranetAPI.Analytics.Services.Builders;
using ExtranetAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace ExtranetAPI.Controllers;

[Route( "analytics" )]
public class AnalyticsController : ControllerBase
{
    private readonly IProjectNumericalIndicatorsBuilder _projectNumericalIndicatorsBuilder;
    private readonly IChartAnalyticsBuilder _chartAnalyticsBuilder;

    public AnalyticsController(
        IProjectNumericalIndicatorsBuilder projectNumericalIndicatorsBuilder,
        IChartAnalyticsBuilder chartAnalyticsBuilder)
    {
        _projectNumericalIndicatorsBuilder = projectNumericalIndicatorsBuilder;
        _chartAnalyticsBuilder = chartAnalyticsBuilder;
    }
    
    /// <summary>
    /// Числовые показатели за период
    /// </summary>
    /// <param name="period"></param>
    /// <returns></returns>
    [HttpPost( "numerical-indicators" )]
    [SwaggerResponse( statusCode: 200, type: typeof( NumericalIndicatorsDto ), description: "Числовые показатели за период" )]
    public async Task<IActionResult> GetNumericalIndicators( [FromBody] NumericalPeriodDto period )
    {
        if ( period.Period.StartDate > period.Period.EndDate )
        {
            return BadRequest();
        }

        return Ok( await _projectNumericalIndicatorsBuilder.Build( period ) );
    }
    
    /// <summary>
    /// Получить данные для аналитики по дате
    /// </summary>
    /// <param name="chart"></param>
    /// <returns></returns>
    [HttpPost( "data-by-date" )]
    [SwaggerResponse( statusCode: 200, type: typeof( List<ChartItemDto> ), description: "Получить данные для аналитики по дате" )]
    public async Task<IActionResult> GetDataByDate( [FromBody] ChartDto chart )
    {
        return Ok( await _chartAnalyticsBuilder.Build( chart.ChartType, chart.ChartPeriodType, chart.Period ) );
    }
    
    /// <summary>
    /// Получить данные для аналитики по периоду
    /// </summary>
    /// <param name="chart"></param>
    /// <returns></returns>
    [HttpPost( "data-by-period" )]
    [SwaggerResponse( statusCode: 200, type: typeof( List<ChartItemWeeksDto> ), description: "Получить данные для аналитики по дате" )]
    public async Task<IActionResult> GetDataByPeriod( [FromBody] ChartDto chart )
    {
        return Ok( await _chartAnalyticsBuilder.BuildByPeriod( chart.ChartType, chart.ChartPeriodType, chart.Period ) );
    }
}