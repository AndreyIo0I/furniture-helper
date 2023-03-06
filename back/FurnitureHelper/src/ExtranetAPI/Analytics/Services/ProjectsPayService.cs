using Domain.ProjectManagement;
using Infrastructure.Foundation.EntityFramwork;
using Microsoft.EntityFrameworkCore;

namespace ExtranetAPI.Analytics.Services;

public class ProjectsPayService: IProjectsPayService
{
    private readonly FurnitureHelperDbContext _context;

    public ProjectsPayService(FurnitureHelperDbContext furnitureHelperDbContext)
    {
        _context = furnitureHelperDbContext;
    }

    public async Task<List<Tuple<Project, DateTime>>> GetProjectWithPayByPeriod(DateTime startDate, DateTime endDate)
    {
        var projectsWithPayQuery =
            from pb in _context.ProjectBudgets
            join p in _context.Projects on pb.ProjectId equals p.Id
            select new
            {
                Budget = pb,
                Project = p
            };

        var queryResult = await projectsWithPayQuery.ToListAsync();

        queryResult = queryResult.Where(x => x.Budget.ClientPayments.Count() == 2).ToList();
        queryResult = queryResult.Where(x => x.Budget.ClientPayments
            .OrderByDescending(y => y.PaymentDate).First().PaymentDate >= startDate && x.Budget.ClientPayments
            .OrderByDescending(y => y.PaymentDate).First().PaymentDate <= endDate).ToList();

        return queryResult.Select(x => new Tuple<Project, DateTime>(x.Project, x.Budget.ClientPayments
            .OrderByDescending(y => y.PaymentDate).First().PaymentDate)).ToList();
    }
}