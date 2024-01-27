using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace Diary.Api;

public class CustomIdProvider : IUserIdProvider
{
	public string? GetUserId(
		HubConnectionContext connection)
	{
		var httpContext = connection.GetHttpContext();
		var user =
			httpContext!.User.FindFirst(
				ClaimTypes.NameIdentifier);
		return user?.Value;
	}
}