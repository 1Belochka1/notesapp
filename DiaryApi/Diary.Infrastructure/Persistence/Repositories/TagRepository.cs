namespace Diary.Infrastructure.Persistence.Repositories;

public class TagRepository
{
	private readonly DiaryDbContext _dbContext;

	public TagRepository(DiaryDbContext dbContext)
	{
		_dbContext = dbContext;
	}
}