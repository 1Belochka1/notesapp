using Diary.Application.Common.Interfaces.Persistence;
using Diary.Application.Note.Queries.GetAllByUserId;
using Diary.Domain.Note;
using MediatR;

namespace Diary.Application.Note.Queries.GetAllNotesByTagId;

public class GetAllByTagIdQueryHandler :
	IRequestHandler<
		GetAllNotesByTagIdQuery, ICollection<Notes>>
{
	private readonly INoteRepository _noteRepository;

	public GetAllByTagIdQueryHandler(
		INoteRepository noteRepository)
	{
		_noteRepository = noteRepository;
	}

	public async Task<ICollection<Notes>> Handle(
		GetAllNotesByTagIdQuery request,
		CancellationToken cancellationToken)
	{
		return await _noteRepository.GetAllNotesByTagId(
			request.TagId) ?? new List<Notes>();
	}
}