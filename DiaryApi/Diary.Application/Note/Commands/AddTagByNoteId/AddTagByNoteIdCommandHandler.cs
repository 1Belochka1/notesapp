using Diary.Application.Common.Interfaces.Persistence;
using Diary.Domain.Note;
using MediatR;

namespace Diary.Application.Note.Commands.AddTagByNoteId;

public class AddTagByNoteIdCommandHandler : IRequestHandler<
	AddTagByNoteIdCommand, Notes?>
{
	private readonly INoteRepository _noteRepository;

	private readonly IUnitOfWork _unitOfWork;

	public AddTagByNoteIdCommandHandler(
		INoteRepository noteRepository,
		IUnitOfWork unitOfWork)
	{
		_noteRepository = noteRepository;
		_unitOfWork = unitOfWork;
	}

	public async Task<Notes?> Handle(
		AddTagByNoteIdCommand request,
		CancellationToken cancellationToken)
	{
		var note =
			await _noteRepository.AddTagInNoteByNoteId(
				request.NoteId,
				request.TagId);

		await _unitOfWork.SaveChangesAsync(
			cancellationToken);

		return note;
	}
}