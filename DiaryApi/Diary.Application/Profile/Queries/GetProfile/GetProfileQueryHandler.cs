using Diary.Application.Common.Interfaces.Persistence;
using Diary.Application.Profile.Common;
using MediatR;

namespace Diary.Application.Profile.Queries.GetProfile;

public class GetProfileQueryHandler : IRequestHandler<
	GetProfileQuery, ProfileResult>
{
	private readonly IUserInfoRepository
		_userInfoRepository;

	private readonly IUserRepository _userRepository;

	public GetProfileQueryHandler(
		IUserRepository userRepository,
		IUserInfoRepository userInfoRepository)
	{
		_userRepository = userRepository;
		_userInfoRepository = userInfoRepository;
	}

	public async Task<ProfileResult> Handle(
		GetProfileQuery request,
		CancellationToken cancellationToken)
	{
		var id = Guid.Parse(request.UserId);
		var user = await
			_userRepository.GetByUserId(id);
		var userInfo =
			await _userInfoRepository.GetByUserId(
				id);
		if (user is null || userInfo is null)
			throw new Exception(
				"Произошла ошибка, попробуйте перезайти в систему");

		return new ProfileResult(
			user.Login,
			userInfo.Email,
			userInfo.FirstName,
			userInfo.LastName);
	}
}