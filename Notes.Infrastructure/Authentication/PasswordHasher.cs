using Diary.Application.Common.Interfaces.Authentication;

namespace Diary.Infrastructure.Authentication;

public class PasswordHasher : IPasswordHasher
{
	public string GeneratePassword(string password)
	{
		return BCrypt.Net.BCrypt.HashPassword(
			password);
	}

	public bool VerifyPassword(
		string password,
		string passwordHash)
	{
		return BCrypt.Net.BCrypt.Verify(
			password,
			passwordHash);
	}
}