namespace Diary.Application.Common.Interfaces.
	Authentication;

public interface IPasswordHasher
{
	public string GeneratePassword(string password);

	public bool VerifyPassword(
		string password,
		string passwordHash);
}