using Diary.Application.Common.Interfaces.Persistence;
using Diary.Domain.Note;
using MediatR;

namespace Diary.Application.Note.Queries.GetAllByUserId;

public class GetAllNotesByUserIdQueryHandler :
	IRequestHandler<
		GetAllByUserIdQuery, ICollection<Notes>>
{
	private readonly INoteRepository _noteRepository;

	public GetAllNotesByUserIdQueryHandler(
		INoteRepository noteRepository)
	{
		_noteRepository = noteRepository;
	}

	public async Task<ICollection<Notes>> Handle(
		GetAllByUserIdQuery request,
		CancellationToken cancellationToken)
	{
		return await _noteRepository.GetAllByUser(
			request.UserId) ?? new List<Notes>();
	}
}