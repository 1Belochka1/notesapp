using Diary.Application.Authentication.Common;
using Diary.Application.Common.Interfaces.Authentication;
using Diary.Application.Common.Interfaces.Persistence;
using Diary.Domain.User;
using Diary.Domain.UserInfo;
using MediatR;

namespace Diary.Application.Authentication.Commands.
	Register;

public class
	RegisterCommandHandler : IRequestHandler<RegisterCommand
		,
		AuthenticationResult>
{
	private readonly IJwtTokenGenerator _jwtTokenGenerator;
	private readonly IPasswordHasher _passwordHasher;
	private readonly IUnitOfWork _unitOfWork;

	private readonly IUserInfoRepository
		_userInfoRepository;

	private readonly IUserRepository _userRepository;

	public RegisterCommandHandler(
		IJwtTokenGenerator jwtTokenGenerator,
		IUserRepository userRepository,
		IPasswordHasher passwordHasher,
		IUserInfoRepository userInfoRepository,
		IUnitOfWork unitOfWork)
	{
		_jwtTokenGenerator = jwtTokenGenerator;
		_userRepository = userRepository;
		_passwordHasher = passwordHasher;
		_userInfoRepository = userInfoRepository;
		_unitOfWork = unitOfWork;
	}

	public async Task<AuthenticationResult> Handle(
		RegisterCommand command,
		CancellationToken cancellationToken)
	{
		if (await _userRepository.IsLoginExist(
			    command.Login))
			throw new Exception(
				"Пользователь с данным логином существует");

		var passwordHash =
			_passwordHasher.GeneratePassword(
				command.Password);

		var userId = Guid.NewGuid();

		var user = new Users
		{
			Id = userId,
			Login = command.Login,
			PasswordHash = passwordHash
		};

		var userInfo = new UsersInfo
		{
			Id = Guid.NewGuid(),
			UserId = userId,
			Email = command.Email,
			FirstName = command.FirstName,
			LastName = command.LastName
		};

		await _userRepository.Add(user);
		await _userInfoRepository.Add(userInfo);

		await _unitOfWork.SaveChangesAsync(
			cancellationToken);

		var token =
			_jwtTokenGenerator.GenerateToken(user);

		return new AuthenticationResult(
			user,
			token);
	}
}