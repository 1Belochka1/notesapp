using Diary.Api.Hubs;
using Diary.Application.Authentication.Commands.Register;
using Diary.Application.Authentication.Queries.Login;
using Diary.Contracts.Authentication;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Diary.Api.Controllers;

[Route("auth")]
public class AuthenticationController : ApiController
{
	private readonly IHubContext<ErrorsHub> _hubContext;
	private readonly ISender _mediator;

	public AuthenticationController(
		ISender mediator,
		IHubContext<ErrorsHub> hubContext)
	{
		_mediator = mediator;
		_hubContext = hubContext;
	}

	[HttpPost("register")]
	public async Task<IActionResult> Register(
		RegisterRequest request)
	{
		try
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
		catch (Exception e)
		{
			return BadRequest(e.Message);
		}
	}

	[HttpPost("login")]
	public async Task<IActionResult> Login(
		LoginRequest request)
	{
		try
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

			return Ok(response);
		}
		catch (Exception e)
		{
			return BadRequest(e.Message);
		}
	}
}