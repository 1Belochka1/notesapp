using Diary.Domain.User;

namespace Diary.Application.Common.Interfaces.Persistence;

public interface IUserRepository
{
	Task Add(Users users);

	Task<Users?> GetByLogin(string login);
	Task<Users?> GetByUserId(Guid userId);

	Task<bool> IsLoginExist(string login);
}