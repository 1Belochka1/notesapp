namespace Diary.Application.Profile.Common;

public record ProfileResult(
	string Login,
	string Email,
	string FirstName,
	string LastName);