using Diary.Application.Common.Interfaces.Persistence;

namespace Diary.Infrastructure.Persistence;

public class UnitOfWork : IUnitOfWork
{
	private readonly DiaryDbContext _dbContext;

	public UnitOfWork(DiaryDbContext dbContext)
	{
		_dbContext = dbContext;
	}

	public async Task<int> SaveChangesAsync(
		CancellationToken cancellationToken = default)
	{
		return await _dbContext.SaveChangesAsync(
			cancellationToken);
	}
}