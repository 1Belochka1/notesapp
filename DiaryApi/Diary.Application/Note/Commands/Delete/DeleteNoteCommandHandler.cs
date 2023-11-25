using Diary.Application.Common.Interfaces.Persistence;
using Diary.Domain.Note;
using MediatR;

namespace Diary.Application.Note.Commands.Delete;

public class
	DeleteNoteCommandHandler : IRequestHandler<
		DeleteNoteCommand, Notes>
{
	private readonly INoteRepository _noteRepository;

	private readonly IUnitOfWork _unitOfWork;

	public DeleteNoteCommandHandler(
		INoteRepository noteRepository,
		IUnitOfWork unitOfWork)
	{
		_noteRepository = noteRepository;
		_unitOfWork = unitOfWork;
	}

	public async Task<Notes> Handle(
		DeleteNoteCommand request,
		CancellationToken cancellationToken)
	{
		var note =
			await _noteRepository.Delete(request.NoteId);

		if (note is null)
			throw new Exception("Заметки не существует");

		await _unitOfWork.SaveChangesAsync(
			cancellationToken);

		return note;
	}
}