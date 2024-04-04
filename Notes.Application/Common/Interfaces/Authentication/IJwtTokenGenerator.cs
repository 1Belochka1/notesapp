using Diary.Domain.User;

namespace Diary.Application.Common.Interfaces.Authentication;

public interface IJwtTokenGenerator
{
	string GenerateToken(Users users);
}