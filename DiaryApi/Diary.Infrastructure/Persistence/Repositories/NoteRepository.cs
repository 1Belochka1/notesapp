using Diary.Application.Common.Interfaces.Persistence;
using Diary.Domain.Note;
using Microsoft.EntityFrameworkCore;

namespace Diary.Infrastructure.Persistence.Repositories;

public class NoteRepository : INoteRepository
{
	private readonly DiaryDbContext _dbContext;

	public NoteRepository(DiaryDbContext dbContext)
	{
		_dbContext = dbContext;
	}

	public async Task Add(Notes note)
	{
		await _dbContext.Notes.AddAsync(note);
	}

	public async Task<Notes?> Update(
		Guid noteId,
		string? name,
		string? content)
	{
		var note = await GetById(noteId);

		if (note is null) return null;

		note.Content = content ?? note.Content;
		note.Name = name ?? note.Name;

		return note;
	}

	public async Task<Notes?> GetById(Guid noteId)
	{
		return await _dbContext.Notes.SingleOrDefaultAsync(
			n => n.Id == noteId);
	}

	public async Task<ICollection<Notes>?> GetAllByUser(
		Guid userId)
	{
		return await _dbContext.Notes.Where(
				n => n.UserId == userId)
			.ToArrayAsync();
	}
}