using Diary.Application.Common.Interfaces.Persistence;
using Diary.Domain.Note;
using MediatR;

namespace Diary.Application.Note.Queries.GetAllByUserId;

public class GetAllNotesByUserIdQueryHandler :
	IRequestHandler<
		GetAllNotesByUserIdQuery, ICollection<Notes>>
{
	private readonly INoteRepository _noteRepository;

	public GetAllNotesByUserIdQueryHandler(
		INoteRepository noteRepository)
	{
		_noteRepository = noteRepository;
	}

	public async Task<ICollection<Notes>> Handle(
		GetAllNotesByUserIdQuery request,
		CancellationToken cancellationToken)
	{
		return await _noteRepository.GetAllByUser(
			request.UserId) ?? new List<Notes>();
	}
}