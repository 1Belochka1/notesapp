using Diary.Application.Common.Interfaces.Persistence;
using MediatR;

namespace Diary.Application.User.Queries.IsLoginExist;

public class
	IsLoginExistQueryHandler : IRequestHandler<
		IsLoginExistQuery, bool>
{
	private readonly IUserRepository _userRepository;

	public IsLoginExistQueryHandler(
		IUserRepository userRepository)
	{
		_userRepository = userRepository;
	}

	public async Task<bool> Handle(
		IsLoginExistQuery request,
		CancellationToken cancellationToken)
	{
		return await _userRepository.IsLoginExist(
			request.Login);
	}
}