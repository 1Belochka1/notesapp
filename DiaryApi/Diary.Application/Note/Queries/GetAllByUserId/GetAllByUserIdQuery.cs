using Diary.Domain.Note;
using MediatR;

namespace Diary.Application.Note.Queries.GetAllByUserId;

public record GetAllNotesByUserIdQuery
	(Guid UserId) : IRequest<ICollection<Notes>>;