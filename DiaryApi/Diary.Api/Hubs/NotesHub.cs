using Diary.Application.Common.Note;
using Diary.Application.Note.Commands.Create;
using Diary.Application.Note.Commands.Delete;
using Diary.Application.Note.Commands.Update;
using Diary.Application.Note.Queries.GetAllByUserId;
using Diary.Contracts.Note;
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

	public async Task UpdateNote(
		NoteUpdateRequest updateNote)
	{
		var userId = Context.UserIdentifier;

		var command = new UpdateNoteCommand(
			updateNote.NoteId,
			updateNote.Name,
			updateNote.Content);

		var note = await _mediator.Send(command);

		await Clients.User(userId)
			.SendAsync("UpdateNote", note);
	}

	public async Task DeleteNote(string noteId)
	{
		var userId = Context.UserIdentifier;

		var command =
			new DeleteNoteCommand(Guid.Parse(noteId));

		var note = await _mediator.Send(command);

		await Clients.User(userId)
			.SendAsync("DeleteNote", note);
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