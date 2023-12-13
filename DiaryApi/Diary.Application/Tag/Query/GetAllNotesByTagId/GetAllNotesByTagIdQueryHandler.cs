using Diary.Application.Common.Interfaces.Persistence;
using Diary.Domain.Note;
using MediatR;

namespace Diary.Application.Tag.Query.GetAllNotesByTagId;

public class GetAllNotesByTagIdQueryHandler :
	IRequestHandler<
		GetAllNotesByTagIdQuery, ICollection<Notes>>
{
	private readonly INoteRepository _noteRepository;

	public GetAllNotesByTagIdQueryHandler(
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