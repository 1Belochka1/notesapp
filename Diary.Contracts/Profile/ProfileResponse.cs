namespace Diary.Contracts.Profile;

public record ProfileResponse(
	string Login,
	string Email,
	string FirstName,
	string LastName);