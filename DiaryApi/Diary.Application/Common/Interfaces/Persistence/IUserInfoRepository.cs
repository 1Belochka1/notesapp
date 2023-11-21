using Diary.Domain.UserInfo;

namespace Diary.Application.Common.Interfaces.Persistence;

public interface IUserInfoRepository
{
	Task Add(UsersInfo usersInfo);

	Task<UsersInfo?> GetByEmail(string email);

	Task<UsersInfo?> GetByUserId(Guid userId);

	Task<bool> IsEmailExist(string email);
}