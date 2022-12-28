using Domain.CostsManagement;
using Domain.ProjectManagement;
using ExtranetAPI.Models;
using ExtranetAPI.Models.Analytics;
using ExtranetAPI.Services;
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

    public AnalyticsController(
        IProjectRepository projectRepository,
        IProjectBudgetRepository projectBudgetRepository,
        IAnalyticsService analyticsService,
        ICostRepository costRepository )
    {
        _projectRepository = projectRepository;
        _projectBudgetRepository = projectBudgetRepository;
        _analyticsService = analyticsService;
        _costRepository = costRepository;
    }
    
    /// <summary>
    /// Маржа по проекту
    /// </summary>
    /// <param name="projectId"></param>
    /// <returns></returns>
    [HttpGet( "margin/{projectId}" )]
    [SwaggerResponse( statusCode: 200, type: typeof( decimal ), description: "Маржа по проекту" )]
    public async Task<IActionResult> GetProjectMargin( [FromRoute] int projectId )
    {
        ProjectBudget projectBudget = await _projectBudgetRepository.GetByProjectId( projectId );

        return Ok( 
            _analyticsService.CalculateProjectMargin(
                projectBudget.CostPayments.Select( x => x.Amount ).Sum(),
                projectBudget.ProjectCost ) );
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
            projects = projects.Where( x => x.Name == searchAnalytic.Name ).ToList();
        }
        
        IReadOnlyList<ProjectBudget> projectBudgets = await _projectBudgetRepository.GetByProjectIds( projects.Select( x => x.Id ).ToList() );

        List<ProjectMarginDto> projectMarginDtos = new();

        foreach ( var projectBudget in projectBudgets )
        {
            Project project = projects.Single( x => x.Id == projectBudget.ProjectId );
            
            ProjectMarginDto projectMarginDto = new ProjectMarginDto
            {
                ProjectStartdate = project.DateOfStart,
                ProjectName = project.Name,
                ProjectDeadLine = project.DeadLine,
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
    /// Норма прибыли
    /// </summary>
    /// <param name="projectId"></param>
    /// <returns></returns>
    [HttpGet("profitNorm/{projectId}")]
    [SwaggerResponse(statusCode: 200, type: typeof(string), description: "Норма прибыли")]
    public async Task<IActionResult> GetProfitNorm([FromRoute] int projectId)
    {
        ProjectBudget projectBudget = await _projectBudgetRepository.GetByProjectId(projectId);

        return Ok(
            _analyticsService.CalculateProjectProfitNorm(
                projectBudget.CostPayments.Select( x => x.Amount ).Sum(),
                projectBudget.ProjectCost ) );
    }

    /// <summary>
    /// Норма прибавочной стоимости
    /// </summary>
    /// <param name="projectId"></param>
    /// <returns></returns>
    [HttpGet( "rateOfSurplusValue/{projectId}" )]
    [SwaggerResponse( statusCode: 200, type: typeof( string ), description: "Норма прибавочной стоимости" )]
    public async Task<IActionResult> GetRateOfSurplusValue( [FromRoute] int projectId )
    {
        ProjectBudget projectBudget = await _projectBudgetRepository.GetByProjectId( projectId );

        return Ok(
            _analyticsService.CalculateProjectRateOfSurplusValue(
                projectBudget.CostPayments.Select( x => x.Amount ).Sum(),
                projectBudget.ProjectCost ) );
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
            .Where(x => ( x.EndDate.HasValue && x.EndDate.Value.Date > x.DeadLine.Date ) 
                || ( !x.EndDate.HasValue && x.DeadLine.Date < currentDate.Date ) )
            .ToList();
        
        if ( !String.IsNullOrEmpty( searchAnalytic.Name ) )
        {
            projects = projects.Where( x => x.Name == searchAnalytic.Name ).ToList();
        }

        List<OutdatedProjectDto> outdatedProjects = new();

        foreach ( var project in projects )
        {
            OutdatedProjectDto projectDto = new OutdatedProjectDto
            {
                StartDate = project.DateOfStart,
                DeadLine = project.DeadLine,
                ProjectName = project.Name,
                WastedDays = ( int ) ( currentDate - project.DateOfStart ).TotalDays
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
    /// Траты на издержки по проекту
    /// </summary>
    /// <param name="projectId"></param>
    /// <returns></returns>
    [HttpGet( "spendingOnCosts/{projectId}" )]
    [SwaggerResponse( statusCode: 200, type: typeof( SpendingOnProjectCostsDto ), description: "Траты на издержки по проекту" )]
    public async Task<IActionResult> GetSpendingOnProjectCosts( [FromRoute] int projectId )
    {
        Project project = await _projectRepository.GetById( projectId );
        
        ProjectBudget projectBudget = await _projectBudgetRepository.GetByProjectId( projectId );

        Dictionary<int, List<CostPayment>> costPayments =
            projectBudget.CostPayments.GroupBy(x => x.CostId)
                .ToDictionary(x => x.Key, x => x.ToList());

        List<Cost> costs = await _costRepository.GetAll( projectBudget.CostPayments.Select( x => x.CostId ).ToList() );

        Dictionary<int, Cost> costsToIds = costs.ToDictionary( x => x.Id, x => x );

        List<SpendingOnCostDto> spendingOnCosts = costPayments.Select( x => new SpendingOnCostDto
        {
            Amount = x.Value.Select( c => c.Amount ).Sum(),
            Name = costsToIds[ x.Key ].Name
        } ).ToList();

        return Ok(
            new SpendingOnProjectCostsDto
            {
                SpendingOnCosts = spendingOnCosts,
                ProjectName = project.Name
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
            ProjectName = projects.Single( p => p.Id == x.ProjectId ).Name,
            ProjectPrice = x.ProjectCost
        } ).OrderBy( x => x.ProjectPrice ).ToList();

        return Ok(
            projectPrices.Count == 0 
                ? new ProjectsPricesDto() 
                : new ProjectsPricesDto
                    {
                        ProjectPrices = projectPrices
                            .GroupBy( x => x.ProjectName )
                            .Select( pps => new ProjectPriceDto
                            {
                                ProjectPrice = pps.Select( pp => pp.ProjectPrice ).Sum(),
                                ProjectName = pps.Key
                            } ).ToList(),
                        AveragePrice = decimal.Divide(
                            projectPrices.Select( x => x.ProjectPrice ).Sum(),
                            projectPrices.Count ),
                        MaxProjectPrice = projectPrices.Last(),
                        MinProjectPrice = projectPrices[ 0 ]
                    } );
    }
}