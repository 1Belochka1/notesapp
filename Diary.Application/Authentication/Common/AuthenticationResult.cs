using Diary.Domain.User;

namespace Diary.Application.Authentication.Common;

public record AuthenticationResult(
	Users Users,
	string Token);