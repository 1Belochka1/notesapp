using Diary.Domain.Tag;
using MediatR;

namespace Diary.Application.Tag.Command.Update;

public record UpdateTagCommand
	(Guid TagId, string Name) : IRequest<Tags?>;