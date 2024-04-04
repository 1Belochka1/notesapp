using Diary.Application.Common.Interfaces.Persistence;
using Diary.Domain.User;
using Microsoft.EntityFrameworkCore;

namespace Diary.Infrastructure.Persistence.Repositories;

public class UserRepository : IUserRepository
{
	private readonly DiaryDbContext _dbContext;

	public UserRepository(DiaryDbContext dbContext)
	{
		_dbContext = dbContext;
	}

	public async Task Add(Users users)
	{
		await _dbContext.Users.AddAsync(users);
	}

	public async Task<Users?> GetByLogin(string login)
	{
		return await _dbContext.Users
			.SingleOrDefaultAsync(
				u => u.Login == login);
	}

	public async Task<bool> IsLoginExist(string login)
	{
		return await _dbContext.Users
			.Select(u => new { u.Login })
			.SingleOrDefaultAsync(
				u => u.Login == login) is not null;
	}

	public async Task<Users?> GetByUserId(Guid userId)
	{
		return await _dbContext.Users.SingleOrDefaultAsync(
			u => u.Id == userId);
	}
}