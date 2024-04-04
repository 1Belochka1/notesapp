using Diary.Application.Common.Interfaces.Persistence;
using Diary.Domain.Note;
using MediatR;

namespace Diary.Application.Note.Commands.DeleteTagByNoteId;

public class DeleteTagByNoteIdCommandHandler :
	IRequestHandler<
		DeleteTagByNoteIdCommand, Notes?>
{
	private readonly INoteRepository _noteRepository;

	private readonly IUnitOfWork _unitOfWork;

	public DeleteTagByNoteIdCommandHandler(
		INoteRepository noteRepository,
		IUnitOfWork unitOfWork)
	{
		_noteRepository = noteRepository;
		_unitOfWork = unitOfWork;
	}

	public async Task<Notes?> Handle(
		DeleteTagByNoteIdCommand request,
		CancellationToken cancellationToken)
	{
		var note =
			await _noteRepository.DeleteTagInNoteByNoteId(
				request.NoteId,
				request.TagId);

		await _unitOfWork.SaveChangesAsync(
			cancellationToken);

		return note;
	}
}