using Diary.Domain.Note;
using MediatR;

namespace Diary.Application.Note.Commands.AddTagByNoteId;

public record AddTagByNoteIdCommand
	(Guid NoteId, Guid TagId) : IRequest<Notes?>;