using Diary.Application.Common.Interfaces.Persistence;
using Diary.Domain.Note;
using MediatR;

namespace Diary.Application.Note.Commands.Update;

public class
	UpdateNoteCommandHandler : IRequestHandler<UpdateNoteCommand,
		Notes>
{
	private readonly INoteRepository _noteRepository;

	private readonly IUnitOfWork _unitOfWork;

	public UpdateNoteCommandHandler(
		INoteRepository noteRepository,
		IUnitOfWork unitOfWork)
	{
		_noteRepository = noteRepository;
		_unitOfWork = unitOfWork;
	}

	public async Task<Notes> Handle(
		UpdateNoteCommand request,
		CancellationToken cancellationToken)
	{
		var note =
			await _noteRepository.Update(
				request.NoteId,
				request.Name,
				request.Content);

		if (note is null)
			throw new Exception("Заметки не существует");

		await _unitOfWork.SaveChangesAsync(
			cancellationToken);

		return note;
	}
}