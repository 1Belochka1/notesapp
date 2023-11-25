using Diary.Api.Hubs;
using Diary.Application.Common.Note;
using Diary.Application.Note.Commands.Create;
using Diary.Application.Note.Commands.Update;
using Diary.Application.Note.Queries.GetAllByUserId;
using Diary.Contracts.Note;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace Diary.Api.Controllers;

[Route("note")]
[Authorize]
public class NotesController : ApiController
{
	private readonly IHubContext<NotesHub> _hubContext;
	private readonly ISender _mediator;

	public NotesController(
		ISender mediator,
		IHubContext<NotesHub> hubContext)
	{
		_mediator = mediator;
		_hubContext = hubContext;
	}

	[HttpGet("getById/{id}")]
	public async Task<IActionResult> GetById(Guid id)
	{
		return Ok();
	}

	[HttpGet("getAll")]
	public async Task<IActionResult> GetAllByUser()
	{
		var userId =
			HttpContext.User.FindFirst(
					ClaimTypes.NameIdentifier)
				?.Value;
		if (userId is null) return BadRequest();

		var query =
			new GetAllNotesByUserIdQuery(
				Guid.Parse(userId));

		var notes = await _mediator.Send(query);

		return Ok(notes);
	}

	[HttpPost("create")]
	public async Task<IActionResult> Create(CreateNote note)
	{
		var userId =
			HttpContext.User.FindFirst(
					ClaimTypes.NameIdentifier)
				?.Value;
		if (userId is null) return BadRequest();

		var command = new CreateNoteCommand(
			Guid.Parse(userId),
			note);

		var response = await _mediator.Send(command);

		await _hubContext.Clients.User(userId)
			.SendAsync("AddNote", note);
		return Ok(note);
	}

	[HttpPost("update")]
	public async Task<IActionResult> Update(
		NoteUpdateRequest request)
	{
		var userId =
			HttpContext.User.FindFirst(
					ClaimTypes.NameIdentifier)
				?.Value;
		if (userId is null) return BadRequest();

		var command = new UpdateNoteCommand(
			request.NoteId,
			request.Name,
			request.Content);

		var note = await _mediator.Send(command);

		await _hubContext.Clients.User(userId)
			.SendAsync("UpdateNote", note);

		return Ok(note);
	}

	// public async Task<IActionResult> Delete()
	// {
	// 	return Ok();
	// }
}