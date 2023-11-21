namespace Diary.Contracts.Authentication;

public record AuthenticationResponse(
	Guid Id,
	string Login,
	string Token
);