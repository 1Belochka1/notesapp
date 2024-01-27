using Diary.Application.Tag.Query.GetAllNotesByTagId;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace Diary.Api.Hubs;

public class TagHub : Hub
{
	private readonly ISender _mediator;

	public TagHub(ISender mediator)
	{
		_mediator = mediator;
	}

	public async Task GetNotesInTag(string tagId)
	{
		var query =
			new GetAllNotesByTagIdQuery(Guid.Parse(tagId));

		var response = await _mediator.Send(query);

		await Clients.Caller.SendAsync(
			"GetNotesInTag",
			response);
	}
}