using Diary.Application.Authentication.Commands.Register;
using Diary.Application.Authentication.Queries.Login;
using Diary.Contracts.Authentication;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Diary.Api.Controllers;

[Route("auth")]
public class AuthenticationController : ApiController
{
	private readonly ISender _mediator;

	public AuthenticationController(
		ISender mediator)
	{
		_mediator = mediator;
	}

	[HttpPost("register")]
	public async Task<IActionResult> Register(
		RegisterRequest request)
	{
		var command = new RegisterCommand(
			request.Login,
			request.Password,
			request.Email,
			request.FirstName,
			request.LastName);

		var authResult = await _mediator.Send(command);

		var response = new AuthenticationResponse(
			authResult.Users.Id,
			authResult.Users.Login,
			authResult.Token);

		return Ok(response);
	}

	[HttpPost("login")]
	public async Task<IActionResult> Login(
		LoginRequest request)
	{
		var query = new LoginQuery(
			request.Login,
			request.Password);

		var authResult =
			await _mediator.Send(query);

		var response = new AuthenticationResponse(
			authResult.Users.Id,
			authResult.Users.Login,
			authResult.Token);


		// var claimsIdentity = new ClaimsIdentity(
		// 	new List<Claim>
		// 	{
		// 		new(
		// 			ClaimTypes.Sid,
		// 			response.Id.ToString(),
		// 			nameof(Int32))
		// 	},
		// 	JwtBearerDefaults.AuthenticationScheme);
		//
		//
		// await HttpContext.SignInAsync(
		// 	JwtBearerDefaults.AuthenticationScheme,
		// 	new ClaimsPrincipal(claimsIdentity));

		return Ok(response);
	}
}