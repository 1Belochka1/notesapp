using Diary.Application.Common.Interfaces.Authentication;
using Diary.Application.Common.Interfaces.Services;
using Diary.Domain.User;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Diary.Infrastructure.Authentication;

public class JwtTokenGenerator : IJwtTokenGenerator
{
	private readonly IDateTimeProvider _dateTimeProvider;
	private readonly JwtSettings _jwtSettings;

	public JwtTokenGenerator(
		IDateTimeProvider dateTimeProvider,
		IOptions<JwtSettings> jwtSettings)
	{
		_dateTimeProvider = dateTimeProvider;
		_jwtSettings = jwtSettings.Value;
	}

	public string GenerateToken(Users users)
	{
		var signingCredentials = new SigningCredentials(
			new SymmetricSecurityKey(
				Encoding.UTF8.GetBytes(_jwtSettings.Secret)),
			SecurityAlgorithms.HmacSha256);


		var claims = new[]
		{
			new Claim(JwtRegisteredClaimNames.Sub, users.Id.ToString()),
			new Claim(JwtRegisteredClaimNames.Name, users.Login),
			new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
		};

		var securityToken = new JwtSecurityToken(
			_jwtSettings.Issuer,
			_jwtSettings.Audience,
			expires: _dateTimeProvider.UtcNow.AddMinutes(
				_jwtSettings.ExpiryMinutes),
			claims: claims,
			signingCredentials: signingCredentials);

		return new JwtSecurityTokenHandler().WriteToken(securityToken);
	}
}