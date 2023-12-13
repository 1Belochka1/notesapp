using Diary.Application.Common.Interfaces.Persistence;
using Diary.Domain.Note;
using MediatR;

namespace Diary.Application.Note.Queries.GetById;

public class
	GetByIdQueryHandler : IRequestHandler<GetByIdQuery,
		Notes?>
{
	private readonly INoteRepository _noteRepository;

	public GetByIdQueryHandler(
		INoteRepository noteRepository)
	{
		_noteRepository = noteRepository;
	}

	public async Task<Notes?> Handle(
		GetByIdQuery request,
		CancellationToken cancellationToken)
	{
		return
			await _noteRepository.GetById(request.NoteId);
	}
}