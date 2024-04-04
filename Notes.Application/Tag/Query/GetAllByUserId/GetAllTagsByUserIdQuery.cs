using Diary.Domain.Tag;
using MediatR;

namespace Diary.Application.Tag.Query.GetAllByUserId;

public record
	GetAllTagsByUserIdQuery
	(Guid UserId, string? Search) : IRequest<
		ICollection<Tags>?>;