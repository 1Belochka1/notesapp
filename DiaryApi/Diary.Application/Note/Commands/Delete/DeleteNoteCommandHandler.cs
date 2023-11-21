using Diary.Application.Common.Interfaces.Persistence;
using Diary.Domain.Note;
using MediatR;

namespace Diary.Application.Note.Commands.Delete;

public class
	DeleteNoteCommandHandler : IRequestHandler<DeleteNoteCommand>
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

	public async Task Handle(
		DeleteNoteCommand request,
		CancellationToken cancellationToken)
	{
		var note = new Notes
		{
			Id = Guid.NewGuid(),
			UserId = request.UserId,
			Name = request.Note.Name,
			Content = request.Note.Content,
			CreateDate = request.Note.CreateDate
		};

		await _noteRepository.Add(note);

		await _unitOfWork.SaveChangesAsync(
			cancellationToken);
	}
}