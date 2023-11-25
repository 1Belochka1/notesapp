using Diary.Domain.Note;
using MediatR;

namespace Diary.Application.Note.Commands.Delete;

public record DeleteNoteCommand(
	Guid NoteId) : IRequest<Notes>;