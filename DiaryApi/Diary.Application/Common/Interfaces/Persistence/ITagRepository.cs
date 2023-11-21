using Diary.Domain.Tag;

namespace Diary.Application.Common.Interfaces.Persistence;

public interface ITagRepository
{
	Task Add(Tags tags);
}