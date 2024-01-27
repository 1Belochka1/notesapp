using Diary.Domain.Tag;
using MediatR;

namespace Diary.Application.Tag.Command.Delete;

public record DeleteTagCommand
	(Guid TagId) : IRequest<Tags?>;