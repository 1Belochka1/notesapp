using Diary.Api.Hubs;
using Diary.Application.Common.Note;
using Diary.Application.Note.Commands.Create;
using Diary.Application.Note.Queries.ExportPdfNote;
using Diary.Application.Note.Queries.GetAllByUserId;
using Diary.Application.Note.Queries.GetById;
using Diary.Application.Tag.Query.GetAllNotesByTagId;
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

	[HttpGet("getAll")]
	public async Task<IActionResult> GetAllByUser()
	{
		var userId =
			HttpContext.User.FindFirst(
					ClaimTypes.NameIdentifier)
				?.Value;

		if (userId is null) return BadRequest();

		var query =
			new GetAllByUserIdQuery(
				Guid.Parse(userId));

		var notes = await _mediator.Send(query);

		return Ok(notes);
	}

	[HttpGet("exportPdf/{noteId}")]
	public async Task<IActionResult> ExportPdf(
		string noteId)
	{
		var queryNote =
			new GetByIdQuery(Guid.Parse(noteId));

		var responseNote = await _mediator.Send(queryNote);

		var queryExport =
			new ExportPdfNoteQuery(responseNote.Content);

		var responseExport =
			await _mediator.Send(queryExport);

		return Ok(responseExport);
	}

	[HttpGet("getAllByTagId/{tagId}")]
	public async Task<IActionResult> GetAllByTagId(
		string tagId)
	{
		var query =
			new GetAllNotesByTagIdQuery(
				Guid.Parse(tagId));

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

		return Ok(response);
	}

	// public async Task<IActionResult> Delete()
	// {
	// 	return Ok();
	// }
}