using Domain.CostsManagement;
using Domain.ProjectManagement;
using ExtranetAPI.Analytics.Models.ProjectSummary;
using ExtranetAPI.Models.ProjectSummary;

namespace ExtranetAPI.Analytics.Services.Builders;

public class ProjectSummaryBuilder : IProjectSummaryBuilder
{
    private Project _project;
    private ProjectBudget _projectBudget;
    
    private readonly IProjectRepository _projectRepository;
    private readonly ICostRepository _costRepository;
    private readonly IProjectBudgetRepository _projectBudgetRepository;
    private readonly IProjectStageRepository _projectStageRepository;
    private readonly IAnalyticsService _analyticsService;
    
    public ProjectSummaryBuilder(
        IProjectStageRepository projectStageRepository,
        IProjectBudgetRepository projectBudgetRepository,
        ICostRepository costRepository,
        IProjectRepository projectRepository,
        IAnalyticsService analyticsService )
    {
        _projectStageRepository = projectStageRepository;
        _projectBudgetRepository = projectBudgetRepository;
        _costRepository = costRepository;
        _projectRepository = projectRepository;
        _analyticsService = analyticsService;
    }

    public async Task<ProjectSummaryTableDto> Build( int projectId )
    {
        _project = await _projectRepository.GetById( projectId );
        _projectBudget = await _projectBudgetRepository.GetByProjectId( projectId );
        
        CostPriceDto costPrice = await BuildCostPrice();
        
        return new ProjectSummaryTableDto
        {
            ContractNumber = _project.ContractNumber,
            ProjectType = _project.ProjectType,
            StartDate = _project.DateOfStart,
            EndDate = _project.EndDate,
            NumberOfDays = ( _project.DateOfStart.HasValue && _project.EndDate.HasValue )
                ? ( _project.EndDate.Value - _project.DateOfStart.Value ).Days
                : 0,
            ProjectCost = _projectBudget.ProjectCost,
            CostPrice = costPrice,
            Margin = _analyticsService.CalculateProjectMargin( costPrice.CostPrice, _projectBudget.ProjectCost ),
            ProfitNorm = _analyticsService.CalculateProjectProfitNorm( costPrice.CostPrice, _projectBudget.ProjectCost ),
            RateOfSurplusValue = _analyticsService.CalculateProjectRateOfSurplusValue( costPrice.CostPrice, _projectBudget.ProjectCost ),
            Stages = await BuildStages()
        };
    }

    private async Task<CostPriceDto> BuildCostPrice()
    {
        List<int> costIds = _projectBudget.CostPayments.Select( x => x.CostId ).ToList();
        Dictionary<int, Cost> costsByIds = ( await _costRepository.GetAll( costIds ) )
            .ToDictionary( x => x.Id, x => x );
        
        decimal costPrice = _projectBudget.CostPayments.Select(x => x.Amount).Sum();

        return new CostPriceDto
        {
            CostPrice = costPrice,
            Costs = _projectBudget.CostPayments.Select( x => new CostDto
            {
                Amount = x.Amount,
                Name = costsByIds[ x.CostId ].Name,
                Persent = costPrice != decimal.Zero
                    ? decimal.Divide( x.Amount, costPrice )
                    : costPrice
            } ).ToList()
        };
    }

    private async Task<List<StageDto>> BuildStages()
    {
        List<ProjectStage> projectStages = await _projectStageRepository.GetByProjectId( _project.Id );

        return projectStages.Select(x => new StageDto
        {
            Name = x.Name,
            IsCompleted = x.IsCompleted
        } ).ToList();
    }
}