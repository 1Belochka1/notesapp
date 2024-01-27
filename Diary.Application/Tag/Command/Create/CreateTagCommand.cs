using Diary.Domain.Tag;
using MediatR;

namespace Diary.Application.Tag.Command.Create;

public record CreateTagCommand
	(Guid UserId, string Name) : IRequest<Tags?>;