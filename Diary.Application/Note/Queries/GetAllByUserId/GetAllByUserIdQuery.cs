using Diary.Domain.Note;
using MediatR;

namespace Diary.Application.Note.Queries.GetAllByUserId;

public record GetAllByUserIdQuery
	(Guid UserId) : IRequest<ICollection<Notes>>;