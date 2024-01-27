using Diary.Application.Note.Commands.AddTagByNoteId;
using Diary.Application.Note.Commands.Delete;
using Diary.Application.Note.Commands.DeleteTagByNoteId;
using Diary.Application.Note.Commands.Update;
using Diary.Application.Note.Queries.ExportPdfNote;
using Diary.Application.Note.Queries.GetById;
using Diary.Contracts.Note;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace Diary.Api.Hubs;

public class NoteEditorHub : Hub
{
	private readonly IHubContext<NotesHub> _hubContext;
	private readonly ISender _mediator;

	public NoteEditorHub(
		ISender mediator,
		IHubContext<NotesHub> hubContext)
	{
		_mediator = mediator;
		_hubContext = hubContext;
	}

	public async Task GetNote(string noteId)
	{
		var query = new GetByIdQuery(Guid.Parse(noteId));

		var response = await _mediator.Send(query);

		await Clients.Caller.SendAsync("GetNote", response);
	}

	public async Task DeleteNote(string noteId)
	{
		var command =
			new DeleteNoteCommand(Guid.Parse(noteId));

		var response = await _mediator.Send(command);

		await Clients
			.OthersInGroup(noteId)
			.SendAsync(
				"DeleteNote");

		var userId = Context.UserIdentifier;

		if (userId is null) return;

		await _hubContext.Clients.User(userId)
			.SendAsync("DeleteNoteInNotes", response);
	}

	public async Task UpdateNote(
		NoteUpdateRequest updateNote)
	{
		var command = new UpdateNoteCommand(
			updateNote.NoteId,
			updateNote.Name,
			updateNote.Content);

		var response = await _mediator.Send(command);

		await Clients
			.OthersInGroup(updateNote.NoteId.ToString())
			.SendAsync(
				"UpdateNote",
				new[] { (object)response, false });

		var userId = Context.UserIdentifier;

		if (userId is null) return;

		await _hubContext.Clients.User(userId)
			.SendAsync("UpdateNoteInNotes", response);
	}

	public async Task AddTagInNoteByNoteId(
		string noteId,
		string tagId)
	{
		var command = new AddTagByNoteIdCommand(
			Guid.Parse(noteId),
			Guid.Parse(tagId));

		var response = await _mediator.Send(command);

		if (response is null) return;

		await Clients
			.Group(noteId)
			.SendAsync(
				"UpdateNote",
				new[] { (object)response, false });

		var userId = Context.UserIdentifier;

		if (userId is null) return;

		await _hubContext.Clients.User(userId)
			.SendAsync("UpdateNoteInNotes", response);
	}

	public async Task DeleteTagInNoteByNoteId(
		string noteId,
		string tagId)
	{
		var command = new DeleteTagByNoteIdCommand(
			Guid.Parse(noteId),
			Guid.Parse(tagId));

		var response = await _mediator.Send(command);

		if (response is null) return;

		await Clients
			.Group(noteId)
			.SendAsync(
				"UpdateNote",
				new[] { (object)response, false });

		var userId = Context.UserIdentifier;

		if (userId is null) return;

		await _hubContext.Clients.User(userId)
			.SendAsync("UpdateNoteInNotes", response);
	}

	public async Task ExportPdf(string html)
	{
		var query = new ExportPdfNoteQuery(html);

		var response = await _mediator.Send(query);

		await Clients.Caller.SendAsync(
			"ExportPdf",
			response);
	}

	public async Task JoinGroup(string groupId)
	{
		await Groups.AddToGroupAsync(
			Context.ConnectionId,
			groupId);
	}

	public async Task LeaveGroup(string groupId)
	{
		await Groups.RemoveFromGroupAsync(
			Context.ConnectionId,
			groupId);
	}
}