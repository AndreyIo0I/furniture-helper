namespace Application.Foundation
{
    public interface IUnitOfWork
    {
        Task Commit();
    }
}
