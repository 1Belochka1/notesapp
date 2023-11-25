using Diary.Domain.Note;

namespace Diary.Application.Common.Interfaces.Persistence;

public interface INoteRepository
{
	Task Add(Notes note);

	Task<Notes?> Update(
		Guid noteId,
		string? name,
		string? content);

	Task<Notes?> Delete(
		Guid noteId);

	Task<Notes?> GetById(Guid noteId);

	Task<ICollection<Notes>?> GetAllByUser(Guid userId);
}