using Diary.Application.Common.Interfaces.Persistence;
using Diary.Domain.Note;
using Microsoft.EntityFrameworkCore;

namespace Diary.Infrastructure.Persistence.Repositories;

public class NoteRepository : INoteRepository
{
	private readonly DiaryDbContext _dbContext;

	public NoteRepository(
		DiaryDbContext dbContext)
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

	public async Task<Notes?> Delete(Guid noteId)
	{
		var note =
			await _dbContext.Notes.SingleOrDefaultAsync(
				n => n.Id == noteId);

		if (note is null) return null;

		_dbContext.Notes.Remove(note);

		return note;
	}

	public async Task<ICollection<Notes>?>
		GetAllNotesByTagId(Guid tagId)
	{
		var tag =
			await _dbContext.Tags.SingleOrDefaultAsync(
				t => t.Id == tagId);
		if (tag is null) return null;

		return
			await _dbContext.Notes.Include(n => n.Tags)
				.Where(n => n.Tags.Contains(tag))
				.ToListAsync();
	}

	public async Task<Notes?> GetById(Guid noteId)
	{
		return await _dbContext.Notes
			.Include(n => n.Tags)
			.SingleOrDefaultAsync(
				n => n.Id == noteId);
	}

	public async Task<ICollection<Notes>?> GetAllByUser(
		Guid userId)
	{
		return await _dbContext.Notes
			.Include(
				n => n.Tags)
			.IgnoreAutoIncludes()
			.Where(
				n => n.UserId == userId)
			.ToArrayAsync();
	}

	public async Task<Notes?> AddTagInNoteByNoteId(
		Guid noteId,
		Guid tagId)
	{
		var note =
			await _dbContext.Notes.Include(n => n.Tags)
				.SingleOrDefaultAsync(
					n => n.Id == noteId);

		var tag =
			await _dbContext.Tags.SingleOrDefaultAsync(
				t => t.Id == tagId);

		if (note is null || tag is null)
			return null;

		note.Tags.Add(tag);

		return note;
	}

	public async Task<Notes?> DeleteTagInNoteByNoteId(
		Guid noteId,
		Guid tagId)
	{
		var note =
			await _dbContext.Notes
				.Include(n => n.Tags)
				.SingleOrDefaultAsync(
					n => n.Id == noteId);

		var tag =
			await _dbContext.Tags.SingleOrDefaultAsync(
				t => t.Id == tagId);

		if (note is null || tag is null)
			return null;

		note.Tags.Remove(tag);

		return note;
	}
}