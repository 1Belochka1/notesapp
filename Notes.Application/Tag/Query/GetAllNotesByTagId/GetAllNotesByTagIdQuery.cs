using Diary.Domain.Note;
using MediatR;

namespace Diary.Application.Tag.Query.GetAllNotesByTagId;

public record GetAllNotesByTagIdQuery
	(Guid TagId) : IRequest<ICollection<Notes>>;