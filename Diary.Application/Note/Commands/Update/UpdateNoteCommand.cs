using Diary.Domain.Note;
using MediatR;

namespace Diary.Application.Note.Commands.Update;

public record UpdateNoteCommand
(
	Guid NoteId,
	string? Name,
	string? Content) : IRequest<Notes>;