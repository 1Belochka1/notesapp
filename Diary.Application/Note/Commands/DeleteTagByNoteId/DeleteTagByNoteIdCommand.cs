using Diary.Domain.Note;
using MediatR;

namespace Diary.Application.Note.Commands.DeleteTagByNoteId;

public record DeleteTagByNoteIdCommand
	(Guid NoteId, Guid TagId) : IRequest<Notes?>;