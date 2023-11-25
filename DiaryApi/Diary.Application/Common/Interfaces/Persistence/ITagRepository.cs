using Diary.Domain.Tag;

namespace Diary.Application.Common.Interfaces.Persistence;

public interface ITagRepository
{
	Task Add(Tags tags);

	Task Update(Guid tagId);

	Task Delete(Guid tagId);

	Task<ICollection<Tags>?> GetAllByNoteId(Guid noteId);

	Task<ICollection<Tags>?> GetAllByUserId(Guid userId);
}