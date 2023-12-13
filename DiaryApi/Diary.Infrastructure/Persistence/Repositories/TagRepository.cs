using Diary.Application.Common.Interfaces.Persistence;
using Diary.Domain.Tag;
using Microsoft.EntityFrameworkCore;

namespace Diary.Infrastructure.Persistence.Repositories;

public class TagRepository : ITagRepository
{
	private readonly DiaryDbContext _dbContext;

	public TagRepository(DiaryDbContext dbContext)
	{
		_dbContext = dbContext;
	}

	public async Task Add(Tags tags)
	{
		await _dbContext.Tags.AddAsync(tags);
	}

	public async Task<Tags?> Update(Guid tagId, string name)
	{
		var tag = await GetById(tagId);

		if (tag is null) return null;

		tag.Name = name;

		return tag;
	}

	public async Task<Tags?> Delete(Guid tagId)
	{
		var tag = await GetById(tagId);

		if (tag is null) return null;

		_dbContext.Tags.Remove(tag);

		return tag;
	}

	public async Task<Tags?> GetById(Guid tagId)
	{
		return await _dbContext.Tags.SingleOrDefaultAsync(
			n => n.Id == tagId);
	}

	public async Task<ICollection<Tags>?> GetAllByUserId(
		Guid userId,
		string? search)
	{
		if (search is not null)
			return await _dbContext.Tags.Where(
					n => n.UserId == userId)
				.Where(
					t => t.Name.Contains(
						search,
						StringComparison
							.CurrentCultureIgnoreCase))
				.ToListAsync();

		return await _dbContext.Tags.Where(
				n => n.UserId == userId)
			.ToListAsync();
	}
}