using Diary.Application.Common.Interfaces.Persistence;
using Diary.Domain.Note;
using MediatR;

namespace Diary.Application.Note.Commands.Create;

public class
	CreateNoteCommandHandler : IRequestHandler<
		CreateNoteCommand,
		Notes>
{
	private readonly INoteRepository _noteRepository;

	private readonly IUnitOfWork _unitOfWork;

	public CreateNoteCommandHandler(
		INoteRepository noteRepository,
		IUnitOfWork unitOfWork)
	{
		_noteRepository = noteRepository;
		_unitOfWork = unitOfWork;
	}

	public async Task<Notes> Handle(
		CreateNoteCommand request,
		CancellationToken cancellationToken)
	{
		var note = new Notes
		{
			Id = Guid.NewGuid(),
			UserId = request.UserId,
			Name = request.Note.Name,
			Content = request.Note.Content
		};

		await _noteRepository.Add(note);

		await _unitOfWork.SaveChangesAsync(
			cancellationToken);

		return note;
	}
}