using Diary.Domain.Note;
using MediatR;

namespace Diary.Application.Note.Commands.Delete;

public record DeleteNoteCommand(
	Guid UserId,
	Notes Note) : IRequest;