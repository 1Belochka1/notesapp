using Diary.Application.Authentication.Common;
using MediatR;

namespace Diary.Application.Authentication.Queries.Login;

public record LoginQuery(
	string Login,
	string Password) : IRequest<AuthenticationResult>;