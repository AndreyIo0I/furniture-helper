using Domain.CostsManagement;
using Domain.ProjectManagement;
using ExtranetAPI.Analytics.Models;
using ExtranetAPI.Analytics.Services;
using ExtranetAPI.Analytics.Services.Builders;
using ExtranetAPI.Models;
using ExtranetAPI.Models.Analytics;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace ExtranetAPI.Controllers;

[Route( "analytics" )]
public class AnalyticsController : ControllerBase
{
    private readonly IProjectRepository _projectRepository;
    private readonly IProjectBudgetRepository _projectBudgetRepository;
    private readonly IAnalyticsService _analyticsService;
    private readonly ICostRepository _costRepository;
    private readonly IProjectNumericalIndicatorsBuilder _projectNumericalIndicatorsBuilder;

    public AnalyticsController(
        IProjectRepository projectRepository,
        IProjectBudgetRepository projectBudgetRepository,
        IAnalyticsService analyticsService,
        ICostRepository costRepository,
        IProjectNumericalIndicatorsBuilder projectNumericalIndicatorsBuilder )
    {
        _projectRepository = projectRepository;
        _projectBudgetRepository = projectBudgetRepository;
        _analyticsService = analyticsService;
        _costRepository = costRepository;
        _projectNumericalIndicatorsBuilder = projectNumericalIndicatorsBuilder;
    }
    
    /// <summary>
    /// Числовые показатели за период
    /// </summary>
    /// <param name="period"></param>
    /// <returns></returns>
    [HttpPost( "numerical-indicators" )]
    [SwaggerResponse( statusCode: 200, type: typeof( NumericalIndicatorsDto ), description: "Числовые показатели за период" )]
    public async Task<IActionResult> GetNumericalIndicators( [FromBody] Period period )
    {
        if ( period.StartDate > period.EndDate )
        {
            return BadRequest();
        }

        return Ok( await _projectNumericalIndicatorsBuilder.Build( period ) );
    }

    /// <summary>
    /// Маржа по проектам за период
    /// </summary>
    /// <param name="searchAnalytic"></param>
    /// <returns></returns>
    [HttpPost( "margin" )]
    [SwaggerResponse( statusCode: 200, type: typeof( ProjectsMagrinDto ), description: "Маржа по проектам за период" )]
    public async Task<IActionResult> GetProjectMargin( [FromBody] SearchAnalyticDto searchAnalytic )
    {
        IReadOnlyList<Project> projects = await _projectRepository.GetAll( searchAnalytic.Period.StartDate.Date, searchAnalytic.Period.EndDate.Date );
        
        if ( !String.IsNullOrEmpty( searchAnalytic.Name ) )
        {
            projects = projects.Where( x => x.ProjectType == searchAnalytic.Name ).ToList();
        }
        
        IReadOnlyList<ProjectBudget> projectBudgets = await _projectBudgetRepository.GetByProjectIds( projects.Select( x => x.Id ).ToList() );

        List<ProjectMarginDto> projectMarginDtos = new();

        foreach ( var projectBudget in projectBudgets )
        {
            Project project = projects.Single( x => x.Id == projectBudget.ProjectId );
            
            ProjectMarginDto projectMarginDto = new ProjectMarginDto
            {
                ProjectStartdate = project.DateOfStart.Value,
                ProjectName = project.ProjectType,
                ProjectDeadLine = project.DeadLine.Value,
                ProjectMargin = _analyticsService
                    .CalculateProjectMargin(
                    projectBudget.CostPayments
                        .Select(x => x.Amount )
                        .Sum(),
                    projectBudget.ProjectCost )
            };
            
            projectMarginDtos.Add( projectMarginDto );
        }

        return Ok( 
            new ProjectsMagrinDto
            {
                ProjectMargins = projectMarginDtos,
                Period = searchAnalytic.Period,
                TotalMargin = projectMarginDtos
                    .Select( x => x.ProjectMargin )
                    .Sum()
                
            } );
    }

    /// <summary>
    /// Просроченные проекты
    /// </summary>
    /// <param name="searchAnalytic"></param>
    /// <returns></returns>
    [HttpPost( "outDatedProjects" )]
    [SwaggerResponse( statusCode: 200, type: typeof( OutdatedProjectsDto ), description: "Просроченные проекты" )]
    public async Task<IActionResult> GetOutdatedProjects( [FromBody] SearchAnalyticDto searchAnalytic )
    {
        DateTime currentDate = DateTime.Now;

        IReadOnlyList<Project> projects = await _projectRepository.GetAll( searchAnalytic.Period.StartDate, searchAnalytic.Period.EndDate );
        projects = projects
            .Where(x => ( x.EndDate.HasValue && x.EndDate.Value.Date > x.DeadLine.Value.Date) 
                || ( !x.EndDate.HasValue && x.DeadLine.Value.Date < currentDate.Date ) )
            .ToList();
        
        if ( !String.IsNullOrEmpty( searchAnalytic.Name ) )
        {
            projects = projects.Where( x => x.ProjectType == searchAnalytic.Name ).ToList();
        }

        List<OutdatedProjectDto> outdatedProjects = new();

        foreach ( var project in projects )
        {
            OutdatedProjectDto projectDto = new OutdatedProjectDto
            {
                StartDate = project.DateOfStart.Value,
                DeadLine = project.DeadLine.Value,
                ProjectName = project.ProjectType,
                WastedDays = ( int ) ( currentDate - project.DateOfStart ).Value.TotalDays
            };
            
            outdatedProjects.Add( projectDto );
        }

        return Ok(
            new OutdatedProjectsDto
            {
                OutdatedProjects = outdatedProjects,
                Period = searchAnalytic.Period,
                AverageAmount = decimal.Divide(
                    outdatedProjects.Select( x => x.WastedDays ).Sum(),
                    outdatedProjects.Count )
            } );
    }

    /// <summary>
    /// Траты на издержки
    /// </summary>
    /// <param name="searchAnalytic"></param>
    /// <returns></returns>
    [HttpPost( "spendingOnCosts" )]
    [SwaggerResponse( statusCode: 200, type: typeof( List<SpendingOnCostDto> ), description: "Траты на издержки" )]
    public async Task<IActionResult> GetSpendingCosts( [FromBody] SearchAnalyticDto searchAnalytic )
    {
        List<Cost> costs = await _costRepository.GetAll();
        
        if ( !String.IsNullOrEmpty( searchAnalytic.Name ) )
        {
            costs = costs.Where(x => x.Name == searchAnalytic.Name).ToList();
        }
        
        Dictionary<int, Cost> costsToIds = costs.ToDictionary( x => x.Id, x => x );
        
        IReadOnlyList<Project> projects = await _projectRepository.GetAll();

        IReadOnlyList<ProjectBudget> projectBudgets = await _projectBudgetRepository
            .GetByProjectIds( projects.Select( x => x.Id ).ToList() );

        List<SpendingOnCostDto> spendingOnCostDtos = new();

        foreach (var costsToId in costsToIds)
        {
            List<CostPayment> costPayments = projectBudgets
                    .SelectMany( x => x.CostPayments )
                    .Where( cp => cp.CostId == costsToId.Key 
                        && cp.PaymentDate.Date > searchAnalytic.Period.StartDate.Date
                        && cp.PaymentDate.Date < searchAnalytic.Period.EndDate.Date )
                    .ToList();
            
            spendingOnCostDtos.AddRange( costPayments.Select( x => new SpendingOnCostDto
            {
                Name = costsToId.Value.Name,
                Amount = x.Amount
            } ) );
        }

        return Ok( spendingOnCostDtos );
    }
    
    /// <summary>
    /// Цены проектов
    /// </summary>
    /// <param name="period"></param>
    /// <returns></returns>
    [HttpPost( "projectsPrices" )]
    [SwaggerResponse( statusCode: 200, type: typeof( ProjectsPricesDto ), description: "Цены проектов" )]
    public async Task<IActionResult> GetProjectsPrices( [FromBody] Period period )
    {
        IReadOnlyList<Project> projects = await _projectRepository
            .GetAll( period.StartDate.Date, period.EndDate.Date );
        
        IReadOnlyList<ProjectBudget> projectBudgets = await _projectBudgetRepository
            .GetByProjectIds( projects.Select( x => x.Id ).ToList() );

        List<ProjectPriceDto> projectPrices = projectBudgets.Select( x => new ProjectPriceDto
        {
            ProjectName = projects.Single( p => p.Id == x.ProjectId ).ProjectType,
            ProjectPrice = x.ProjectCost
        } ).OrderBy( x => x.ProjectPrice ).ToList();

        return Ok(
            projectPrices.Count == 0 
                ? new ProjectsPricesDto() 
                : new ProjectsPricesDto
                    {
                        ProjectPrices = projectPrices,
                        AveragePrice = decimal.Divide(
                            projectPrices.Select( x => x.ProjectPrice ).Sum(),
                            projectPrices.Count ),
                        MaxProjectPrice = projectPrices.Last(),
                        MinProjectPrice = projectPrices[ 0 ]
                    } );
    }
}