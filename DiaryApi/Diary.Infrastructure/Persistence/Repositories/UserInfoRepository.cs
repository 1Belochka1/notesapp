using Diary.Application.Common.Interfaces.Persistence;
using Diary.Domain.UserInfo;
using Microsoft.EntityFrameworkCore;

namespace Diary.Infrastructure.Persistence.Repositories;

public class UserInfoRepository : IUserInfoRepository
{
	private readonly DiaryDbContext _dbContext;

	public UserInfoRepository(DiaryDbContext dbContext)
	{
		_dbContext = dbContext;
	}

	public async Task Add(UsersInfo usersInfo)
	{
		await _dbContext.UsersInfo.AddAsync(usersInfo);
	}

	public async Task<UsersInfo?> GetByEmail(string email)
	{
		return await _dbContext.UsersInfo
			.SingleOrDefaultAsync(
				u => u.Email == email);
	}

	public async Task<UsersInfo?> GetByUserId(Guid userId)
	{
		return await _dbContext.UsersInfo
			.SingleOrDefaultAsync(u => u.UserId == userId);
	}

	public async Task<bool> IsEmailExist(string email)
	{
		return await _dbContext.UsersInfo
				.Select(u => u.Email)
				.SingleOrDefaultAsync(
					emailUser => emailUser == email)
			is not null;
	}
}