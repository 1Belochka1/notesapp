using Diary.Application.Authentication.Common;
using MediatR;

namespace Diary.Application.Authentication.Commands.
	Register;

public record RegisterCommand(
	string Login,
	string Password,
	string Email,
	string FirstName,
	string LastName) : IRequest<AuthenticationResult>;