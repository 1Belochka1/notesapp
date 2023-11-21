using Diary.Application.Authentication.Common;
using Diary.Application.Common.Interfaces.Authentication;
using Diary.Application.Common.Interfaces.Persistence;
using MediatR;

namespace Diary.Application.Authentication.Queries.Login;

public class
	LoginQueryHandler : IRequestHandler<LoginQuery,
		AuthenticationResult>
{
	private readonly IJwtTokenGenerator _jwtTokenGenerator;
	private readonly IPasswordHasher _passwordHasher;
	private readonly IUserRepository _userRepository;

	public LoginQueryHandler(
		IJwtTokenGenerator jwtTokenGenerator,
		IUserRepository userRepository,
		IPasswordHasher passwordHasher)
	{
		_jwtTokenGenerator = jwtTokenGenerator;
		_userRepository = userRepository;
		_passwordHasher = passwordHasher;
	}

	public async Task<AuthenticationResult> Handle(
		LoginQuery query,
		CancellationToken cancellationToken)
	{
		var user =
			await _userRepository.GetByLogin(query.Login);
		if (user is null)
			throw new Exception(
				"Логин или пароль невырные");

		if (!_passwordHasher.VerifyPassword(
			    query.Password,
			    user.PasswordHash))
			throw new Exception(
				"Логин или пароль невырные");

		var token =
			_jwtTokenGenerator.GenerateToken(user);

		return new AuthenticationResult(
			user,
			token
		);
	}
}