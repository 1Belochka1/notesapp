using Diary.Domain.Tag;

namespace Diary.Application.Common.Interfaces.Persistence;

public interface ITagRepository
{
	Task Add(Tags tags);

	Task<Tags?> Update(Guid tagId, string name);

	Task<Tags?> Delete(Guid tagId);

	Task<Tags?> GetById(Guid tagId);

	Task<ICollection<Tags>?> GetAllByUserId(
		Guid userId,
		string? search);
}