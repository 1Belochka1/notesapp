using Diary.Application.Common.Note;
using Diary.Application.Note.Commands.Create;
using Diary.Application.Note.Queries.GetAllByUserId;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace Diary.Api.Hubs;

public class NotesHub : Hub
{
	private readonly ISender _mediator;

	public NotesHub(ISender mediator)
	{
		_mediator = mediator;
	}

	public async Task AddNote(CreateNote note)
	{
		var userId = Context.UserIdentifier;

		var command = new CreateNoteCommand(
			Guid.Parse(userId),
			note);

		var response = await _mediator.Send(command);

		await Clients.User(userId)
			.SendAsync("AddNote", response);
	}

	public async Task GetNotes()
	{
		var userId = Context.UserIdentifier;

		var query =
			new GetAllNotesByUserIdQuery(
				Guid.Parse(userId));

		var notes = await _mediator.Send(query);

		await Clients.Caller.SendAsync(
			"GetNotes",
			notes);
	}
}