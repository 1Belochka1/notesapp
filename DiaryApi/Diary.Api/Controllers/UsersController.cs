using Diary.Application.Common.Interfaces.Persistence;
using Diary.Application.User.Queries.IsLoginExist;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Diary.Api.Controllers;

[Route("users")]
// [Authorize]
public class UsersController : ApiController
{
	private readonly ISender _mediator;

	public UsersController(IUserRepository userRepository, ISender mediator)
	{
		_mediator = mediator;
	}

	[HttpGet("isLoginExist/{login}")]
	public async Task<IActionResult> GetIsLoginExist(string login)
	{
		var query = new IsLoginExistQuery(login);

		var response = await _mediator.Send(query);

		return Ok(response);
	}
}
