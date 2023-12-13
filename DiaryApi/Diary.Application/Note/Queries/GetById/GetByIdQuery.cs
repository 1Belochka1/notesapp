using Diary.Domain.Note;
using MediatR;

namespace Diary.Application.Note.Queries.GetById;

public record GetByIdQuery(Guid NoteId) : IRequest<Notes?>;