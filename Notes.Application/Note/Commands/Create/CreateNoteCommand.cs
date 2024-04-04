using Diary.Application.Common.Note;
using Diary.Domain.Note;
using MediatR;

namespace Diary.Application.Note.Commands.Create;

public record CreateNoteCommand(
	Guid UserId,
	CreateNote Note) : IRequest<Notes>;