namespace Diary.Contracts.Authentication;

public record RegisterRequest(
	string Login,
	string Password,
	string Email,
	string FirstName,
	string LastName
);