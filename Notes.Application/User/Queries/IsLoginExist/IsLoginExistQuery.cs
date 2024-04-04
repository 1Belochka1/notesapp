using MediatR;

namespace Diary.Application.User.Queries.IsLoginExist;

public record IsLoginExistQuery
	(string Login) : IRequest<bool>;