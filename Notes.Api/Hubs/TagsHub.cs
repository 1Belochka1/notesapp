using Diary.Application.Tag.Command.Create;
using Diary.Application.Tag.Command.Delete;
using Diary.Application.Tag.Command.Update;
using Diary.Application.Tag.Query.GetAllByUserId;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace Diary.Api.Hubs;

public class TagsHub : Hub
{
	private readonly IHubContext<NotesHub> _hubContext;
	private readonly ISender _sender;

	public TagsHub(
		ISender sender,
		IHubContext<NotesHub> hubContext)
	{
		_sender = sender;
		_hubContext = hubContext;
	}

	public async Task GetTags(string? search)
	{
		var userId = Context.UserIdentifier;

		if (userId is null) return;

		var query = new GetAllTagsByUserIdQuery(
			Guid.Parse(userId),
			search);

		var response = await _sender.Send(query);

		await Clients.Caller.SendAsync("GetTags", response);
	}

	public async Task CreateTag(string name)
	{
		try
		{
			var userId = Context.UserIdentifier;

			if (userId is null) return;

			var command = new CreateTagCommand(
				Guid.Parse(userId),
				name);

			var response = await _sender.Send(command);

			await Clients.User(userId)
				.SendAsync("CreateTag", response);
		}
		catch (Exception e)
		{
			await Clients.Caller
				.SendAsync("CreateTag", e.Message);
		}
	}

	public async Task UpdateTag(string tagId, string name)
	{
		var userId = Context.UserIdentifier;

		if (userId is null) return;

		var command = new UpdateTagCommand(
			Guid.Parse(tagId),
			name);

		var response = await _sender.Send(command);

		await Clients.User(userId)
			.SendAsync("UpdateTag", response);

		await _hubContext.Clients.User(userId)
			.SendAsync("UpdateTag", response);
	}

	public async Task DeleteTag(string tagId)
	{
		var userId = Context.UserIdentifier;

		if (userId is null) return;

		var command = new DeleteTagCommand(
			Guid.Parse(tagId));

		var response = await _sender.Send(command);

		await Clients.User(userId)
			.SendAsync("DeleteTag", response);
		await _hubContext.Clients.User(userId)
			.SendAsync("DeleteTag", response);
	}
}