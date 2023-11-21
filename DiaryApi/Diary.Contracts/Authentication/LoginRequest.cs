namespace Diary.Contracts.Authentication;

public record LoginRequest(
	string Login,
	string Password
);