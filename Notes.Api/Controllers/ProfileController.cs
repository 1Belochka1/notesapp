using Diary.Application.Profile.Queries.GetProfile;
using Diary.Contracts.Profile;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Diary.Api.Controllers;

[Route("profile")]
[Authorize]
public class ProfileController : ApiController
{
	private readonly ISender _mediator;

	public ProfileController(ISender mediator)
	{
		_mediator = mediator;
	}

	[HttpGet("getProfile")]
	public async Task<IActionResult> GetProfile()
	{
		var userId =
			HttpContext.User.FindFirst(
					ClaimTypes.NameIdentifier)
				?.Value;
		if (userId is null) return BadRequest();


		var query = new GetProfileQuery(userId);

		var profileResult = await _mediator.Send(query);

		var response = new ProfileResponse(
			profileResult.Login,
			profileResult.Email,
			profileResult.FirstName,
			profileResult.LastName
		);

		return Ok(response);
	}
}