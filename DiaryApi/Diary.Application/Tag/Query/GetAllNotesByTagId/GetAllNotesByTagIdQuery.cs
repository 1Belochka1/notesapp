using Diary.Domain.Note;
using MediatR;

namespace Diary.Application.Note.Queries.GetAllByUserId;

public record GetAllByTagIdQuery
	(Guid TagId) : IRequest<ICollection<Notes>>;